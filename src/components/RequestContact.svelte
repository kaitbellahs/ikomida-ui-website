<script lang="ts">
  import { Stores, Types, Views } from '@ikomida/shared-frontend'
  import { requestContact } from '../network/Contract'

  const contact: Types.Classes.CContract = Types.Classes.CContract.fillWith(undefined)
  let contactValidation = {
    contractName: false,
    name: false,
    lastName: false,
    email: false,
    phone: false
  }
  let screenW: number

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
</div>
<svelte:window bind:innerWidth={screenW} />

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
