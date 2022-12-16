<script lang="ts">
  import { Views, Types, Utils, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import { Link, useLocation } from 'svelte-navigator'
  import { getPlans } from '../network/Plans'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import { Preferences } from '@capacitor/preferences'
  import Description from '../stores/Description'
  import Helper from '../shared/Helper'

  const location = useLocation()
  const ADSCLID_PREFERENCE = 'ADSCLID_PREFERENCE'
  const PROMO_TIME_PREFERENCE = 'PROMO_TIME_PREFERENCE'
  const today = new Date()

  let promoTime: Date
  let clickId: string | null = null
  let plans: Types.Classes.CPlan[]

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
    plans?.length > 0 ? `gratuitamente por ${Helper.daysToMonths(plans?.[0]?.dueDateAfterXDays ?? 0)} Depois` : 'e'
  }
     pague somente ${Utils.Strings.currency(plans?.[0]?.discountedPrice ?? 14875)}/mês. cancele quando quiser.`)
</script>

<ShapeDivider />
<Views.Divider />

<container>
  {#if (plans?.length ?? 0) > 0}
    <div class="shadowedBox header">
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
          Agora aproveita que estamos oferecendo gratuitamente {Helper.daysToMonths(plans[0].dueDateAfterXDays)} por tempo
          limitado
        </h3>
        <p>Depois pague somente {Utils.Strings.currency(plans[0]?.discountedPrice)}/mês. cancele quando quiser.</p>
      {/if}
    </div>
    <Views.Divider />
    <Views.Divider />
    <div class="shadowedBox subHeader">
      <h1>Escolha o seu plano adequado!</h1>
      <span>Mantenha seus clientes fiéis a sua marca</span>
    </div>
    <Views.Divider />
    <section>
      {#each plans as plan}
        <article>
          {#if [Types.Types.TDiscount.PERCENT, Types.Types.TDiscount.VALUE].includes(plan.discountType)}
            <span class="shadow discount"
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
              >Faça uma assinatura e tenha {Helper.daysToMonths(plan.dueDateAfterXDays)} grátis</Views.Status
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
              <span class="current">{Utils.Strings.currency(plan.discountedPrice)}/mês</span>
            {:else}
              <span class="current">{Utils.Strings.currency(plan.price)}/mês</span>
            {/if}
          </div>
          <Views.Divider />
          <Link state={Helper.promoPlan(plan, promoTime, clickId)} to="/checkout">
            <Views.Button size="half">Tenha seu app Agora</Views.Button>
          </Link>
          {#if plan.dueDateAfterXDays && clickId && promoTime > today}
            <small
              ><Link to="termsOfUse"><u>Sujeito a Termos e Condições</u></Link>. {Helper.isPlural(
                plan.dueDateAfterXDays
              )
                ? `Os`
                : 'O'}
              {Helper.daysToMonths(plan.dueDateAfterXDays)} grátis não estão disponíveis para usuários que contrataram um
              plano. A oferta termina em {Utils.Strings.dateToDateString(promoTime)}.</small
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
    Após a assinatura é necessário aguardar até 15 dias úteis para que o seu app seja publicado nas lojas Apple store e
    Google play, se não houver dependência no processo!
  </p>
  <Views.Divider />
  <RequestContact />
</container>

<style>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    padding: 32pt;
    background: #cccccc33;
    min-height: 400pt;
    border-radius: 8pt;
  }
  .subHeader {
    text-align: center;
  }
  section {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16pt;
  }

  section > article {
    position: relative;
    margin: 12pt 12pt;
    border-radius: 8pt;
    flex: 1;
    width: 33%;
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
    padding-top: 32pt;
    text-shadow: 0.8pt 0.4pt#00000055;
    box-shadow: 0 4pt 8pt #0000009e;
    text-align: center;
  }
  section > article > .bestChoice:after {
    content: '';
    display: block;
    position: absolute;
    border-right: 8pt solid #ffc03e;
    left: 0;
    top: 100%;
    border-bottom: 1pt solid transparent;
  }
  section > article > .bestChoice:before {
    content: '';
    display: block;
    position: absolute;
    border-right: 8pt solid #ffc03e;
    left: 0;
    bottom: 100%;
    border-top: 4pt solid transparent;
  }
  section > article > .bestChoice {
    position: absolute;
    left: -7pt;
    top: -7pt;
    width: auto;
    height: 32pt;
    display: flex;
    align-items: center;
    padding: 0 16pt 0 12pt;
    border-radius: 0 32pt 32pt 0;
    background: #ffeabe;
    font-family: Roboto, sans-serif;
    font-weight: 900;
    font-size: 16pt;
    line-height: 1;
    color: #4c0708;
    text-shadow: 0.8pt 1pt #00000055;
    box-shadow: 0 4pt 8pt #0000009e;
  }
  section > article > .discount {
    position: absolute;
    top: -8pt;
    right: -8pt;
    border-radius: 20.8pt;
    min-width: 64pt;
    background: #4c0708;
    color: white;
    line-height: 24pt;
    padding: 0pt 8pt;
    text-shadow: 0.8pt 1pt #00000055;
    box-shadow: 0 4pt 8pt #0000009e;
  }
  section > article > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  section > article > ul > li {
    text-align: start;
    border-bottom: 1pt solid rgba(204, 204, 204, 0.397);
    padding: 18pt 16pt 8pt 16pt;
  }
  section > article > ul > li > span {
    font-weight: bold;
  }
  section > article > .price {
    margin-top: 16pt;
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
    padding: 16pt;
  }
  small :global(*) {
    font-size: 1em;
    color: black;
  }
  @media screen and (max-width: 816pt) {
    section > article {
      width: 100%;
      flex-basis: 100%;
      margin-top: 16pt;
    }
  }
  .green {
    color: green;
  }
</style>
