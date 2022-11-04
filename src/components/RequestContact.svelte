<script lang="ts">
  import { Preferences } from '@capacitor/preferences'
  import { Stores, Types, Views } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import { navigate, useLocation } from 'svelte-navigator'
  import { requestContact } from '../network/Contract'

  const PROMO_TIME_PREFERENCE = 'PROMO_TIME_PREFERENCE'
  const SHOW_PROMO_PREFERENCE = 'SHOW_PROMO_PREFERENCE'
  const location = useLocation()
  const contact: Types.Classes.CContract = Types.Classes.CContract.fillWith(undefined)

  let contactValidation = {
    contractName: false,
    name: false,
    lastName: false,
    email: false,
    phone: false
  }
  let screenW: number
  let showAlert = false
  let promoTime: Date

  $: margin = screenW > 820 ? 10 : 0
  $: canProced =
    contactValidation?.contractName &&
    contactValidation?.name &&
    contactValidation?.lastName &&
    contactValidation?.phone &&
    contactValidation?.email

  async function send() {
    Stores.Loading.instance.start()
    if (!canProced) {
      Stores.MessageAlert.instance.show('É preciso preencher todos os campos do formulário para solicitar um contato')
      return
    }
    contact.areaCode = 55
    const response = await requestContact(contact)
    if (response.success) {
      Stores.MessageAlert.instance.show(
        'Sua solicitação de contato foi recebida com sucesso e em breve um dos nossos consultores entrará em contato com você.'
      )
    } else {
      Stores.MessageAlert.instance.show(
        response.data ??
          'Não foi possível realizar a sua solicitação de contato, tente de novo ou entre em contato conosco no número (11) 94593-0909!'
      )
    }
    Stores.Loading.instance.stop()
  }

  async function hideAlert() {
    await Preferences.set({
      key: SHOW_PROMO_PREFERENCE,
      value: JSON.stringify(false)
    })
    showAlert = false
  }

  onMount(async () => {
    const value = (
      await Preferences.get({
        key: SHOW_PROMO_PREFERENCE
      })
    )?.value
    showAlert = JSON.parse(value === '' || !value ? 'true' : value)
    if (showAlert) {
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
  })
</script>

<div class="requestContact">
  <h2>Quer saber mais ou ficou com duvidas, preencha seus dados aqui e vamos entrar em contato sem compromisso.</h2>
  <div class="form-group">
    <Views.TextEdit
      placeHolder="Nome"
      bind:value={contact.name}
      bind:isValid={contactValidation.name}
      type={Types.TTextEdit.NAME}
      rightPadding={margin}
      min={3}
      max={50}
    />
    <Views.TextEdit
      placeHolder="Sobrenome"
      bind:value={contact.lastName}
      bind:isValid={contactValidation.lastName}
      type={Types.TTextEdit.NAME}
      leftPadding={margin}
      min={3}
      max={100}
    />
    <Views.TextEdit
      placeHolder="Telefone para contato"
      bind:value={contact.phone}
      bind:isValid={contactValidation.phone}
      type={Types.TTextEdit.PHONE}
      rightPadding={margin}
    />
    <Views.TextEdit
      placeHolder="Email para contato"
      bind:value={contact.email}
      bind:isValid={contactValidation.email}
      type={Types.TTextEdit.EMAIL}
      leftPadding={margin}
    />
    <Views.TextEdit
      placeHolder="Nome do estabelecimento"
      bind:value={contact.contractName}
      bind:isValid={contactValidation.contractName}
      type={Types.TTextEdit.SPACE_ALPHA_NUMERIC}
      min={3}
      max={150}
    />
  </div>
  <Views.Divider />
  <Views.Button disabled={!canProced} on:click={send}>Solicitar um contato</Views.Button>
  <Views.GTerms />
</div>
<svelte:window bind:innerWidth={screenW} />
{#if showAlert}
  <Views.Alert
    title="Oferta imperdível"
    closeCallBack={hideAlert}
    buttons={[
      {
        name: 'Não obrigado',
        callback: hideAlert
      },
      {
        name: $location?.pathname !== '/calculator' ? 'Quero calcular meus gastos' : 'Quero conferir os planos',
        callback: () => {
          hideAlert()
          if ($location?.pathname !== '/calculator') {
            navigate('/calculator', {
              state: { from: $location.pathname },
              replace: true
            })
          } else {
            navigate('/plans', {
              state: { from: $location.pathname },
              replace: true
            })
          }
        },
        principal: true
      }
    ]}
    ><h1>Não sei se você já sacou, mas a gente quer te ajudar a ganhar mais dinheiro?</h1>
    <Views.Divider />
    <Views.Status
      >Pensando em como vamos te ajudar a tornar seu negócio mais lucrativo, desenvolvemos essa plataforma iKomida para
      lhe ajudar a ganhar mais clientes fiéis a sua marca e vender mais sem precisar se preocupar com pagar uma comissão
      absurda sobre seu faturamento, {promoTime > new Date()
        ? 'e além dos valores mensais simbólicos, vamos lhe oferecer 2 meses grátis para que você possa conhecer a plataforma iKomida sem compromisso'
        : 'e valores mensais simbólicos'}. E claro, se não gostar pode cancelar quando quiser sem carência ou tempo
      mínimo do contrato.</Views.Status
    >
    {#if $location?.pathname !== '/calculator'}
      <Views.Divider />
      <Views.Status type={Types.Status.WARNING} showIcon={false}
        >E pra te mostrar o quanto você ta perdendo sem usar a plataforma iKomida, desenvolvemos uma calculadora de
        gastos com vendas online para que você possa ver com seus próprios olhos quanto dinheiro você está perdendo.</Views.Status
      >
    {/if}
  </Views.Alert>
{/if}

<style>
  .requestContact {
    max-width: 100%;
    overflow: hidden;
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
  @media screen and (max-width: 820px) {
    .form-group > :global(.form-cell) {
      flex: 1;
      width: 100%;
      flex-basis: 100%;
      flex-wrap: nowrap;
    }
  }
</style>
