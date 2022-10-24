<script lang="ts">
  import { Views, Types, Utils, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import { Link } from 'svelte-navigator'
  import { getPlans } from '../network/Plans'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  let plans: Types.Classes.CPlan[] = []

  onMount(async () => {
    plans = await getPlans()
    Stores.Loading.instance.stop()
  })
</script>

<ShapeDivider />
<Views.Divider />

<div class="container">
  <h1>Escolha o seu plano adequado!</h1>
  <section>
    {#if plans}
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
          <Link to="{plan.id}/{plan.name}/{plan.price}">
            <Views.Button size="half">Assine já</Views.Button>
          </Link>
        </article>
      {/each}
    {:else}
      <h2>Não foi encontrado nenhum plano, tente verificar a sua conexão com a rede de internet</h2>
    {/if}
  </section>
  <p>
    Após a assinatura é necessário aguardar até 7 dias úteis para que o seu app seja publicado nas lojas Apple store e
    Google play, se não houver dependência no processo!
  </p>
</div>

<style>
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
  @media screen and (max-width: 820px) {
    section > article {
      width: 100%;
      flex-basis: 100%;
      margin-top: 20px;
    }
  }
</style>
