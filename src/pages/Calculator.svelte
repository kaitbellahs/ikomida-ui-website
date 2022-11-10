<script lang="ts">
  import { Views, Utils, Stores, Types, Logics } from '@ikomida/shared-frontend'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import { onMount } from 'svelte'
  import { getPlans } from '../network/Plans'
  import { Link, useLocation } from 'svelte-navigator'
  import Description from '../stores/Description'
  import { Preferences } from '@capacitor/preferences'

  const location = useLocation()
  const ADSCLID_PREFERENCE = 'ADSCLID_PREFERENCE'
  const PROMO_TIME_PREFERENCE = 'PROMO_TIME_PREFERENCE'

  let promoTime: Date
  let clickId: string | null = null
  let plans: Types.Classes.CPlan[]
  let showResult = false
  let item = {
    orders: 160,
    tax: 2300,
    monthly: 20000,
    others: 0,
    billing: 600000
  }
  let resultConcurrence = {
    spends: 0,
    rest: 0,
    percent: 0,
    gain: 0
  }
  let resultiKomida = {
    spends: 0,
    rest: 0,
    percent: 0,
    plan: Types.Classes.CPlan.fillWith(undefined),
    gain: 0
  }
  function onReset() {
    showResult = false
    resultConcurrence = {
      spends: 0,
      rest: 0,
      percent: 0,
      gain: 0
    }
    resultiKomida = {
      spends: 0,
      rest: 0,
      percent: 0,
      plan: Types.Classes.CPlan.fillWith(undefined),
      gain: 0
    }
  }
  function onClick() {
    resultConcurrence.spends =
      Logics.Finances.calcDiscount(item.billing, item.tax, Types.Types.TDiscount.PERCENT) + item.monthly
    resultConcurrence.rest = item.billing - resultConcurrence.spends
    resultConcurrence.percent = Math.round((resultConcurrence.spends * 100) / item.billing) * 100
    resultiKomida.plan =
      plans.filter(plan => (plan.billing ?? 0) >= item.billing && (plan.orders ?? 0) >= item.orders)?.[0] ?? plans[0]
    if (resultiKomida.plan) {
      resultiKomida.spends = resultiKomida.plan.discountedPrice
      resultiKomida.rest = item.billing - resultiKomida.spends
      resultiKomida.percent = Math.ceil((resultiKomida.spends * 100) / item.billing) * 100
      resultiKomida.gain = item.billing - resultiKomida.plan.discountedPrice
    }
    showResult = true
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
  Stores.Title.instance.set(`Calculadora de gastos`)
  Description.instance.set(`Você tem estabelecimento no ramo de gastronomia, bebidas ou similares?
      Vamos fazer algumas contas para você ver quanto você está gastando ou gastaria para vender online, sem e com o uso
      nossa querida plataforma iKomida.
      Esta calculadora vai calcular seus gastos com outros marketplaces e te ajudará a escolher o plano adequado para
      seu negócio digital.`)
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  <div class="jambtron">
    <h1>Você tem estabelecimento no ramo de gastronomia, bebidas ou similares?</h1>
    <Views.Divider />
    <h2>
      Vamos fazer algumas contas para você ver quanto você está gastando ou gastaria para vender online, sem e com o uso
      nossa querida plataforma iKomida.
    </h2>
    <Views.Divider />
    <h3>
      Esta calculadora vai calcular seus gastos com outros marketplaces e te ajudará a escolher o plano adequado para
      seu negócio digital.
    </h3>
    <Views.Divider />
    <Views.Status>Faça seu cálculo sem compromisso agora mesmo.</Views.Status>
  </div>
  <div class="content">
    {#if !showResult}
      <div class="form-group">
        <Views.TextEdit
          placeHolder="Quantidade de pedidos por mês?"
          bind:value={item.orders}
          initialValue={item.orders}
          type={Types.TTextEdit.NUMBER}
        />
        <Views.TextEdit
          placeHolder="Quanto fatura por mês?"
          bind:value={item.billing}
          initialValue={item.billing}
          type={Types.TTextEdit.CURRENCY}
        />
        <Views.TextEdit
          placeHolder="Quanto paga de comissão por venda?"
          bind:value={item.tax}
          initialValue={item.tax}
          type={Types.TTextEdit.PERCENT}
        />
        <Views.TextEdit
          placeHolder="Quanto paga de mensalidade?"
          bind:value={item.monthly}
          initialValue={item.monthly}
          type={Types.TTextEdit.CURRENCY}
        />
        <Views.TextEdit
          placeHolder="Outros gastos para vender online?"
          bind:value={item.others}
          initialValue={item.others}
          type={Types.TTextEdit.CURRENCY}
        />
        <Views.Button on:click={onClick}>Calcular</Views.Button>
      </div>
    {:else}
      <div class="result">
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>Parâmetros</th>
                <th>iKomida</th>
                <th>Outros</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Receita bruta</td>
                <td>{Utils.Strings.currency(item.billing)}/mês</td>
                <td>{Utils.Strings.currency(item.billing)}/mês</td>
              </tr>
              <tr>
                <td>Receita líquida</td>
                <td class:green={resultiKomida.rest >= resultConcurrence.rest}
                  >{Utils.Strings.currency(resultiKomida.rest)}/mês</td
                >
                <td class:red={resultiKomida.rest >= resultConcurrence.rest}
                  >{Utils.Strings.currency(resultConcurrence.rest)}/mês</td
                >
              </tr>
              <tr>
                <td>Total de taxas</td>
                <td class:green={resultiKomida.spends <= resultConcurrence.spends}
                  >{Utils.Strings.currency(resultiKomida.spends)}/mês</td
                >
                <td class:red={resultiKomida.spends <= resultConcurrence.spends}
                  >{Utils.Strings.currency(resultConcurrence.spends)}/mês</td
                >
              </tr>
              <tr>
                <td>Percentagem de taxas</td>
                <td class:green={resultiKomida.percent <= resultConcurrence.percent}
                  >{Utils.Strings.percent(resultiKomida.percent)}/mês</td
                >
                <td class:red={resultiKomida.percent <= resultConcurrence.percent}
                  >{Utils.Strings.percent(resultConcurrence.percent)}/mês</td
                >
              </tr>
              <tr>
                <td>Percentagem de receita líquida</td>
                <td class:green={resultiKomida.percent <= resultConcurrence.percent}
                  >{Utils.Strings.percent(10000 - resultiKomida.percent)}/mês</td
                >
                <td class:red={resultiKomida.percent <= resultConcurrence.percent}
                  >{Utils.Strings.percent(10000 - resultConcurrence.percent)}/mês</td
                >
              </tr>
            </tbody>
          </table>
        </div>
        <Views.Divider />
        <Views.Status type={Types.Status.WARNING}
          >Você economizaria <span class="economy"
            >{Utils.Strings.currency(resultConcurrence.spends - resultiKomida.spends)}/mês</span
          > com iKomida app, e ainda o app vai ser o seu.</Views.Status
        >
        <Views.Divider />
        <h2>Ok Vamos te explicar, tudo direitinho!</h2>
        <Views.Divider />
        Utilizando algum marketplace, você gastou {Utils.Strings.currency(resultConcurrence.spends)}/mês de taxas para
        vender.<br />
        Você vendeu um total de {Utils.Strings.currency(item.billing)} mas você só recebeu {Utils.Strings.currency(
          resultConcurrence.rest
        )}, sacrificando {Utils.Strings.percent(resultConcurrence.percent)} do total do seu faturamento ou seja você recebeu
        somente {Utils.Strings.percent(10000 - resultConcurrence.percent)} das suas vendas.<br />
        <Views.Divider />
        <h2>Agora vamos pra o que interessa</h2>
        <h3>Chega de gastar tudo isso, você merece o melhor</h3>
        <Views.Divider />
        {#if resultiKomida.plan}
          Para fins de comparação, usando os dados preenchidos no formulário. Nós lhe sugerimos <b
            >o plano {resultiKomida.plan.name}</b
          >
          pagando apenas <span class="green">{Utils.Strings.currency(resultiKomida.plan.discountedPrice)}/mês</span><br
          />
          <Views.Divider />
          <h4>Agora vamos calcular os gastos novamente</h4>
          <Views.Divider />
          <Views.Status
            >Agora que você já sabe quanto você está perdendo, vamos lhe mostrar como vamos lhe ajudar a minimizar isso.</Views.Status
          >
          <Views.Divider />
          Você gastaria só {Utils.Strings.currency(resultiKomida.spends)} de mensalidade para vender usando seu próprio aplicativo,
          (Olha que beleza além de ter seu próprio app, você ainda paga menos) .<br />
          Você venderia {Utils.Strings.currency(item.billing)} e receberia {Utils.Strings.currency(resultiKomida.rest)}
          gastando apenas {Utils.Strings.percent(resultiKomida.percent)} ou seja você receberia {Utils.Strings.percent(
            10000 - resultiKomida.percent
          )} das suas vendas.<br />
          <Views.Divider />
          <Views.Status
            >Se tudo isso não vale clicar em “assine já”, eu realmente não sei o que vale (talvez as pessoas gostam de
            perder dinheiro)!</Views.Status
          >
          <Views.Divider />
          <Link
            to="/plans/{resultiKomida.plan.id}/{resultiKomida.plan.name}/{resultiKomida.plan.price}/{resultiKomida.plan
              .dueDateAfterXDays}"
          >
            <Views.Button>Assine já o plano ({resultiKomida.plan.name})</Views.Button>
          </Link>
        {/if}
      </div>
      <Link to="/plans">
        <Views.Button>Veja os outros planos</Views.Button>
      </Link>
      <Views.Button on:click={onReset}>Fazer outro calculo</Views.Button>
    {/if}
    <Views.Divider />
    <RequestContact />
  </div>
</div>

<style>
  .table {
    width: 100%;
    overflow-x: scroll;
  }
  .economy {
    color: green;
    font-size: 2em;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  td {
    padding: 10px;
  }
  .jambtron {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    place-content: center;
    margin-bottom: 30px;
    min-height: 20vh;
    background: #cccccc25;
    border-radius: 10px;
    box-shadow: 1px 2px #cccccc33;
    width: 100%;
    max-width: 1024px;
    padding: 30px;
  }
  .jambtron > h1 {
    align-self: center;
    place-self: center;
  }
  .container {
    max-width: 100%;
    overflow: hidden;
    text-align: justify;
  }
  .content {
    max-width: 1024px;
  }
  .container > * {
    text-align: justify;
  }
  .container > .content {
    text-align: justify;
  }
  .form-group {
    display: flex;
    flex-wrap: wrap;
  }
  .form-group > :global(.form-cell) {
    flex: 50%;
    width: 50%;
    flex-basis: 50%;
  }
  .form-group.buttons {
    flex-wrap: nowrap;
  }
  @media screen and (max-width: 820px) {
    .form-group > :global(.form-cell) {
      flex: 1;
      width: 100%;
      flex-basis: 100%;
      flex-wrap: nowrap;
    }
    .form-group.buttons {
      flex-direction: column-reverse;
      flex-wrap: wrap;
    }
  }
</style>
