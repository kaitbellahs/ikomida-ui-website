<script lang="ts">
  import { Views, Types, Utils, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import { Link, useLocation } from 'svelte-navigator'
  import { getPlans } from '../network/Plans'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import { Preferences } from '@capacitor/preferences'
  import Description from '../stores/Description'

  const location = useLocation()
  const ADSCLID_PREFERENCE = 'ADSCLID_PREFERENCE'
  const PROMO_TIME_PREFERENCE = 'PROMO_TIME_PREFERENCE'

  let promoTime: Date
  let today = new Date()
  let clickId: string | null = null
  let plans: Types.Classes.CPlan[]

  function daysToMonths(days: number) {
    const months = Math.floor(days / 30)
    const leftDays = days - months * 30
    const leftDaysString = leftDays > 0 ? `e ${leftDays} dia${months > 1 ? 's' : ''}` : ''
    return `${months} ${isPlural(days) ? 'meses' : 'mês'}${leftDaysString}`
  }

  function isPlural(days: number) {
    return Math.floor(days / 30) > 1 || days - Math.floor(days / 30) * 30 > 1
  }

  onMount(async () => {
    const params = new URLSearchParams($location?.search)
    clickId = params.get('gclid')
    if (clickId) {
      Preferences.set({
        key: ADSCLID_PREFERENCE,
        value: clickId
      })
    }
    clickId = (
      await Preferences.get({
        key: ADSCLID_PREFERENCE
      })
    )?.value
    if (clickId) {
      let savedDate = (
        await Preferences.get({
          key: PROMO_TIME_PREFERENCE
        })
      )?.value
      if (!savedDate) {
        promoTime = new Date()
        promoTime.setDate(promoTime.getDate() + 7)
        await Preferences.set({
          key: PROMO_TIME_PREFERENCE,
          value: promoTime.toString()
        })
      } else {
        promoTime = new Date(savedDate)
      }
    }
    plans = await getPlans()
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set(`Pratos`)
  $: Description.instance.set(`Aproveite e tenha seu app nas lojas ${
    plans?.length > 0 ? `gratuitamente por ${daysToMonths(plans[0].dueDateAfterXDays ?? 0)} Depois` : 'e'
  }
     pague somente ${Utils.Strings.currency(plans?.[0].discountedPrice ?? 14727)}/mês. cancele quando quiser.`)
</script>

<ShapeDivider />
<Views.Divider />

<div class="container">
  {#if plans}
    <div class="header">
      <h2>Nunca foi tão fácil criar seu próprio app para android e iOS para seu estabelecimento.</h2>
      <p>
        Com alguns clicks só você vai criar um app completo e customizável para seu estabelecimento, e ainda você vai
        economizar mais que <span class="green">20%</span> do seu faturamento se comparar com outras plataformas e
        marketplaces, e também você conta com nosso <span class="green">garçom digital</span> para otimizar sua mão de
        obra.<br />
        Resumindo, você vai sair ganhando de qualquer jeito.<br />
        <span class="green">Ei, não esqueça, pode cancelar se não gostar quando quiser.</span>
      </p>
      {#if plans[0].dueDateAfterXDays && clickId && promoTime > today}
        <h3>
          Agora aproveita que estamos oferecendo gratuitamente {daysToMonths(plans[0].dueDateAfterXDays)} por tempo limitado
        </h3>
        <p>Depois pague somente {Utils.Strings.currency(plans[0].discountedPrice)}/mês. cancele quando quiser.</p>
      {/if}
    </div>
    <Views.Divider />
    <Views.Divider />
    <h1>Escolha o seu plano adequado!</h1>
    <span>Mantenha seus clientes fiéis a sua marca</span>
    <Views.Divider />
    <section>
      {#each plans as plan}
        <article>
          {#if [Types.Types.TDiscount.PERCENT, Types.Types.TDiscount.VALUE].includes(plan.discountType)}
            <span class="discount"
              >-{Types.Types.TDiscount.VALUE === plan.discountType
                ? Utils.Strings.currency(plan.discount)
                : Utils.Strings.percent(plan.discount)}</span
            >
          {/if}
          {#if plan.highlighted}
            <span class="bestChoice">Melhor escolha</span>
          {/if}
          {#if plan.dueDateAfterXDays && clickId && promoTime > today}
            <Views.Status type={Types.Status.INFO}
              >Faça uma assinatura e tenha {daysToMonths(plan.dueDateAfterXDays)} grátis</Views.Status
            >
            <Views.Divider />
          {/if}
          <h2>Prato de {plan.name}</h2>
          <ul>
            <li>
              <span>Faturamento</span>: {(plan?.billing ?? -1) > 0
                ? `até ${Utils.Strings.currency(plan?.billing)}/mês`
                : 'ilimitado'}
            </li>
            <li>
              <span>Pedidos</span>: {(plan?.orders ?? -1) > 0 ? `até ${plan?.orders} pedidos/mês` : 'ilimitado'}
            </li>
            <li>
              <span>Produtos</span>: {(plan?.products ?? -1) > 0 ? `até ${plan?.products} produtos` : 'ilimitado'}
            </li>
            <li>
              <span>Opções por produto</span>: {(plan?.productOptions ?? -1) > 0
                ? `até ${plan?.productOptions} opção por produto`
                : 'ilimitado'}
            </li>
            <li>
              <span>Push notifications</span>: {(plan?.pushNotifications ?? -1) > 0
                ? `até ${plan?.pushNotifications} mensagens/mês`
                : 'ilimitado'}
            </li>
            <li>
              <span>Categorias</span>: {(plan?.categories ?? -1) > 0
                ? `até ${plan?.categories} categorias`
                : 'ilimitado'}
            </li>
            <li>
              <span>Colaboradores</span>: {(plan?.staff ?? -1) > 0 ? `até ${plan?.staff} colaboradores` : 'ilimitado'}
            </li>
            <li>
              <span>Suporte</span>: {plan.support
                ?.map(support => {
                  return support.name
                })
                ?.filter(item => item !== null)
                ?.join(', ') ?? '-'}
            </li>
            {#each plan.details ?? [] as detail}
              {#if detail && detail?.key}
                <li>
                  <span>{detail?.key}</span>{detail?.value ? `: ${detail.value}` : ''}
                </li>
              {/if}
            {/each}
          </ul>

          <div class="price">
            {#if [Types.Types.TDiscount.PERCENT, Types.Types.TDiscount.VALUE].includes(plan.discountType)}
              <span class="oldPrice">{Utils.Strings.currency(plan.price)}/mês</span>
            {/if}
            <span class="current">{Utils.Strings.currency(plan.discountedPrice)}/mês</span>
          </div>
          <Views.Divider />
          <Link to="{plan.id}/{plan.name}/{plan.price}/{plan.dueDateAfterXDays}">
            <Views.Button size="half">Tenha seu app Agora</Views.Button>
          </Link>
          {#if plan.dueDateAfterXDays && clickId && promoTime > today}
            <small
              ><Link to="termsOfUse"><u>Sujeito a Termos e Condições</u></Link>. {isPlural(plan.dueDateAfterXDays)
                ? `Os`
                : 'O'}
              {daysToMonths(plan.dueDateAfterXDays)} grátis não estão disponíveis para usuários que contrataram um plano.
              A oferta termina em {Utils.Strings.dateToDateString(promoTime)}.</small
            >
          {/if}
        </article>
      {/each}
    </section>
  {:else}
    <section>
      <h2>Não foi encontrado nenhum plano, tente verificar a sua conexão com a rede de internet</h2>
    </section>
  {/if}
  <Views.Divider />
  <h2 class="green">
    Não achou o plano adequado para você? deixe seu contato embaixo e vamos entrar em contato com você em breve para
    customizar um plano para suas necessidades.
  </h2>
  <p>
    Após a assinatura é necessário aguardar até 7 dias úteis para que o seu app seja publicado nas lojas Apple store e
    Google play, se não houver dependência no processo!
  </p>
  <Views.Divider />
  <RequestContact />
</div>

<style>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    padding: 30px;
    background: #cccccc33;
    min-height: 400px;
    border: 1px solid #cccccc44;
    border-radius: 10px;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  section > article {
    position: relative;
    border: 1px solid #ccc;
    margin: 5px 10px;
    border-radius: 5px;
    flex: 1;
    width: 33%;
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    text-shadow: 0.5px 0.3px #00000055;
    box-shadow: 2px 3px #00000099;
  }
  section > article > .bestChoice:after {
    content: '';
    display: block;
    position: absolute;
    border-right: 7px solid #ffc03e;
    left: 0;
    top: 100%;
    border-bottom: 2px solid transparent;
  }
  section > article > .bestChoice:before {
    content: '';
    display: block;
    position: absolute;
    border-right: 7px solid #ffc03e;
    left: 0;
    bottom: 100%;
    border-top: 2px solid transparent;
  }
  section > article > .bestChoice {
    position: absolute;
    left: -7px;
    top: -7px;
    width: auto;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 20px 0 13px;
    border-radius: 0 30px 30px 0;
    background: #ffeabe;
    font-family: Roboto, sans-serif;
    font-weight: 900;
    font-size: 17px;
    line-height: 1;
    color: #4c0708;
    text-shadow: 0.5px 1px #00000055;
    box-shadow: 2px 3px #00000099;
  }
  section > article > .discount {
    position: absolute;
    top: -5px;
    right: -5px;
    border-radius: 20.5px;
    min-width: 60px;
    border: 1px solid #4c0708;
    background: #4c0708;
    color: white;
    line-height: 21px;
    padding: 0px 8px;
    text-shadow: 0.5px 1px #00000055;
    box-shadow: 2px 3px #00000099;
  }
  section > article > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  section > article > ul > li {
    text-align: start;
    border-bottom: 1px solid #ccc;
    padding: 15px 20px 9px 20px;
  }
  section > article > ul > li > span {
    font-weight: bold;
  }
  section > article > .price {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }
  section > article > .price > span.oldPrice {
    text-decoration: line-through;
    color: #717171;
    font-size: 0.8rem;
  }
  section > article > .price > span.current {
    color: green;
  }
  small {
    font-size: 0.8em;
    padding: 20px;
  }
  small :global(*) {
    font-size: 1em;
    color: black;
  }
  @media screen and (max-width: 820px) {
    section > article {
      width: 100%;
      flex-basis: 100%;
      margin-top: 20px;
    }
  }
  .green {
    color: green;
  }
</style>
