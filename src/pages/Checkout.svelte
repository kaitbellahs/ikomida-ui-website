<script lang="ts">
  import { Views, Utils, Stores, Types, Logics } from '@ikomida/shared-frontend'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  import { doContract, GetAddressByCep, requestPhoneValidation, validatePhoneValidationCode } from '../network/Contract'
  import { getTermOfUse } from '../network/Terms'
  import creditCardType from 'credit-card-type'
  import { faPhone, faUnlock } from '@fortawesome/free-solid-svg-icons'
  import { onDestroy, onMount } from 'svelte'
  import Referral from '../stores/referral'
  import type { CreditCardType } from 'credit-card-type/dist/types'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  interface IContractInputs {
    address: {
      postalCode: Views.TextEdit | null
      street: Views.TextEdit | null
      number: Views.TextEdit | null
      complement: Views.TextEdit | null
      neighborhood: Views.TextEdit | null
      city: Views.TextEdit | null
      stat: Views.TextEdit | null
    }
  }

  export let id: string
  export let plan: string
  export let price: number
  export let navigate: any
  export let location: any

  const countdownWaitTime = 60

  let stage = 0
  let timer: NodeJS.Timer | null = null
  let canRequestCode = true
  let countdown = 0
  let cardBrandIcon: string | undefined
  let cardNumberMask = '____ ____ ____ ____'
  let cardCodeMask = '___'
  let buttonNext = 'Continuar'
  let cardInfo: CreditCardType
  let currentPostalCode: string | undefined = ''
  let isValidValidationCode = false
  let showRequestValidatingCodeAlert = false
  let screenW: number

  let subscribeObject: Types.Classes.CContract
  let subscribeObjectValidation = {
    canDigitValidationCode: false,
    contractName: false,
    name: false,
    lastName: false,
    contractIdentity: false,
    email: false,
    cpf: false,
    phone: false,
    password: false,
    confirmPassword: false,
    phoneValidationCode: false,
    signature: false,
    plan: {
      id,
      name: plan,
      price
    },
    payment: {
      number: false,
      holder: false,
      validity: false,
      code: false
    },
    address: {
      postalCode: false,
      street: false,
      number: false,
      complement: false,
      neighborhood: false,
      city: false,
      stat: false
    }
  }
  let inputs: IContractInputs = {
    address: {
      postalCode: null,
      street: null,
      number: null,
      complement: null,
      neighborhood: null,
      city: null,
      stat: null
    }
  }

  $: canProgress =
    (stage === 0 && isStage0Valid) ||
    (stage === 1 && isStage1Valid) ||
    (stage === 2 && isStage2Valid) ||
    (stage === 3 && isStage3Valid)

  $: isStage0Valid =
    subscribeObjectValidation?.contractName &&
    subscribeObjectValidation?.name &&
    subscribeObjectValidation?.lastName &&
    subscribeObjectValidation?.contractIdentity &&
    subscribeObjectValidation?.email &&
    subscribeObjectValidation?.cpf &&
    subscribeObjectValidation?.password &&
    subscribeObject?.password === subscribeObject?.confirmPassword

  $: isStage1Valid =
    subscribeObjectValidation?.address?.postalCode &&
    subscribeObjectValidation?.address?.number &&
    subscribeObjectValidation?.address?.street &&
    subscribeObjectValidation?.address?.neighborhood &&
    subscribeObjectValidation?.address?.city &&
    subscribeObjectValidation?.address?.stat

  $: isStage2Valid = subscribeObjectValidation?.phone && isValidValidationCode

  $: isStage3Valid =
    subscribeObjectValidation?.payment?.number &&
    subscribeObjectValidation?.payment?.code &&
    subscribeObjectValidation?.payment?.holder &&
    subscribeObjectValidation?.payment?.validity

  $: if (countdown === 0) {
    if (timer) {
      clearInterval(timer)
    }
    canRequestCode = true
    countdown = countdownWaitTime
  }

  $: if (subscribeObjectValidation?.address?.postalCode && subscribeObject?.address?.postalCode != currentPostalCode) {
    findAddress()
  }

  $: if ((String(subscribeObject?.payment?.number ?? 0)?.length ?? 0) > 1) {
    const cardInfos = creditCardType(String(subscribeObject.payment?.number ?? 0))
    if (cardInfos && cardInfos.length === 1) {
      cardInfo = cardInfos[0]
      let gapsIndex = 0
      cardNumberMask = ''
      for (let i = 1; i <= cardInfo?.lengths[0]; i++) {
        cardNumberMask += '_'
        if (i == cardInfo?.gaps?.[gapsIndex]) {
          gapsIndex++
          cardNumberMask += ' '
        }
      }
      cardCodeMask = ''
      for (let i = 1; i <= cardInfo?.code?.size; i++) {
        cardCodeMask += '_'
      }
      cardBrandIcon = `/assets/cardBrand/${cardInfo?.type?.toLowerCase()}.svg`
    } else {
      cardNumberMask = '____ ____ ____ ____'
      cardCodeMask = '___'
      cardBrandIcon = undefined
    }
  }

  $: planDescription = () => {
    switch (plan) {
      case 'gold':
        return 'Ouro'
      case 'silver':
        return 'Prata'
      case 'bronze':
        return 'Bronze'
      default:
        return plan
    }
  }

  $: if (stage === 3) {
    buttonNext = 'Contratar'
  } else {
    buttonNext = 'Continuar'
  }

  $: margin = screenW > 820 ? 10 : 0

  function doBack() {
    stage--
  }

  function validateValidationCode(validationValid: string) {
    return (validationValid?.length ?? 0) == 4
  }

  function toggleshowRequestValidatingCodeAlert() {
    showRequestValidatingCodeAlert = !showRequestValidatingCodeAlert
  }

  async function RequestPhoneValidation() {
    showRequestValidatingCodeAlert = false
    Stores.Loading.instance.start()
    subscribeObject.phone = subscribeObject.phone
    const response = await requestPhoneValidation(subscribeObject)
    if (response?.success) {
      subscribeObject.signature = response?.data
      subscribeObjectValidation.canDigitValidationCode = true
      canRequestCode = false
      countdown = countdownWaitTime
      timer = setInterval(() => {
        countdown--
      }, 1000)
      Stores.MessageAlert.instance.show(
        `Digite o código que você receberá em instantes no seu celular no campo "Código de validação" e clica no botão “CONFIRMAR”`
      )
    } else {
      Stores.MessageAlert.instance.show(response?.data)
    }
    Stores.Loading.instance.stop()
  }

  async function ValidatePhoneCode() {
    Stores.Loading.instance.start()
    const response = await validatePhoneValidationCode(subscribeObject)
    if (response?.success) {
      isValidValidationCode = true
      Stores.MessageAlert.instance.show(
        `O código inserido é correto!, agora é só clicar no botão “CONTINUAR” para finalizar seu cadastro`
      )
    } else {
      Stores.MessageAlert.instance.show(response?.data)
    }
    Stores.Loading.instance.stop()
  }

  function validateStage0() {
    if (!subscribeObjectValidation?.contractName) {
      Stores.MessageAlert.instance.show('O nome do estabelecimento é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.name) {
      Stores.MessageAlert.instance.show('O nome é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.lastName) {
      Stores.MessageAlert.instance.show('O sobre nome é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.contractIdentity) {
      Stores.MessageAlert.instance.show('O CNPJ é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.email) {
      Stores.MessageAlert.instance.show('O email é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.cpf) {
      Stores.MessageAlert.instance.show('O CPF é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.password || !subscribeObjectValidation?.confirmPassword) {
      Stores.MessageAlert.instance.show('A senha não é válida.')
      return false
    }
    return true
  }

  function validateStage1() {
    if (!subscribeObjectValidation?.address?.postalCode) {
      Stores.MessageAlert.instance.show('O CEP é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.address?.number) {
      Stores.MessageAlert.instance.show('O número do endereço não é válido.')
    } else if (!subscribeObjectValidation?.address?.street) {
      Stores.MessageAlert.instance.show('O nome é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.address?.neighborhood) {
      Stores.MessageAlert.instance.show('O bairro é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.address?.city) {
      Stores.MessageAlert.instance.show('A cidade é incorretaa')
      return false
    } else if (!subscribeObjectValidation.address?.stat) {
      Stores.MessageAlert.instance.show('A unidade federal é incorreta.')
      return false
    }
    return true
  }

  function validateStage2() {
    if (!subscribeObjectValidation?.phone) {
      Stores.MessageAlert.instance.show('O Número do telefone é incorreto.')
      return false
    } else if (!isValidValidationCode) {
      Stores.MessageAlert.instance.show('O Código de validação é incorreto.')
      return false
    }
    return true
  }

  function validateStage3() {
    if (!subscribeObjectValidation?.payment?.number) {
      Stores.MessageAlert.instance.show('O número do cartão é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.payment?.code) {
      Stores.MessageAlert.instance.show('O Código do cartão é incorreto.')
      return false
    } else if (!subscribeObjectValidation?.payment?.holder) {
      Stores.MessageAlert.instance.show(`o nome gravado no cartão é incorreto.`)
      return false
    } else if (!subscribeObjectValidation?.payment?.validity) {
      Stores.MessageAlert.instance.show(`A validade do cartão é incorreto.`)
      return false
    }
    return true
  }

  async function doSubscribe() {
    if (
      (stage === 0 && !validateStage0()) ||
      (stage === 1 && !validateStage1()) ||
      (stage === 2 && !validateStage2()) ||
      (stage === 3 && !validateStage3())
    ) {
      return false
    }
    if (stage === 3) {
      Stores.Loading.instance.start()
      const response = await doContract(subscribeObject)
      if (response?.success) {
        navigate('/result', {
          state: { from: location.pathname },
          replace: true
        })
      } else {
        Stores.MessageAlert.instance.show(response?.data)
      }
      Stores.Loading.instance.stop()
      return true
    }
    stage++
  }

  function findAddress() {
    Stores.Loading.instance.start()
    currentPostalCode = subscribeObject?.address?.postalCode
    GetAddressByCep(subscribeObject?.address?.postalCode)
      .then(response => {
        if (response?.success) {
          const address = response?.data
          currentPostalCode = address?.postalCode
          subscribeObject.address = { ...subscribeObject?.address, ...address }
          Utils?.Objects?.updateInputs(inputs, subscribeObject)
        } else {
          Stores.MessageAlert.instance.show(response?.data)
        }
        Stores.Loading.instance.stop()
      })
      .catch(exception => {
        Stores.MessageAlert.instance.show(exception)
      })
  }

  function validatePassword(password: string) {
    return subscribeObject.confirmPassword === password
  }

  onDestroy(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  function validateCardValidation(date: string) {
    const dateString = `20${date.substring(2, 4)}-${date.substring(0, 2)}-28`
    if (
      date.length !== 4 ||
      !Logics.Validations.validateDate(dateString) ||
      new Date(Number(`20${date.substring(2, 4)}`), Number(date.substring(0, 2)), 0) < new Date()
    ) {
      return false
    }
    return true
  }
  onMount(async () => {
    subscribeObject = Types.Classes.CContract.fillWith(null)
    const term = await getTermOfUse()
    if (term) {
      subscribeObject.termId = term?.id
    }
    subscribeObject.plan = Types.Classes.CPlan.fromObject({
      id,
      name: plan,
      price
    })
    subscribeObject.areaCode = 55
    Stores.Loading.instance.stop()
  })
  $: Stores.Title.instance.set(`Checkout [${stage + 1}/4]`)
</script>

<ShapeDivider />
<Views.Divider />
{#if subscribeObject}
  <div class="container">
    {#if stage === 0}
      <h1>Contratar o serviço</h1>
      <h3>Você escolheu o prato de {planDescription()}!</h3>
      <p>Preencha todos dados corretamente!</p>
      <h2>Dados do estabelecimento</h2>
      <div class="form-group">
        <Views.TextEdit
          focus={true}
          type={Types.TTextEdit.NAME}
          filter={/[A-Za-z0-9 -\.]/gi}
          placeHolder="Nome do estabelecimento"
          bind:value={subscribeObject.contractName}
          bind:isValid={subscribeObjectValidation.contractName}
          initialValue={subscribeObject.contractName}
          rightPadding={margin}
          min={3}
          max={255}
        />
        <Views.TextEdit
          type={Types.TTextEdit.CNPJ}
          placeHolder="CNPJ do estabelecimento"
          bind:value={subscribeObject.contractIdentity}
          initialValue={subscribeObject.contractIdentity}
          bind:isValid={subscribeObjectValidation.contractIdentity}
          leftPadding={margin}
        />
        <Views.TextEdit
          type={Types.TTextEdit.NAME}
          placeHolder="Nome do responsável"
          bind:value={subscribeObject.name}
          bind:isValid={subscribeObjectValidation.name}
          initialValue={subscribeObject.name}
          rightPadding={margin}
          min={3}
          max={255}
        />
        <Views.TextEdit
          type={Types.TTextEdit.NAME}
          placeHolder="Sobre nome do responsável"
          bind:value={subscribeObject.lastName}
          bind:isValid={subscribeObjectValidation.lastName}
          initialValue={subscribeObject.lastName}
          leftPadding={margin}
          min={3}
          max={255}
        />
        <Views.TextEdit
          placeHolder="Email do responsável"
          type={Types.TTextEdit.EMAIL}
          bind:value={subscribeObject.email}
          initialValue={subscribeObject.email}
          bind:isValid={subscribeObjectValidation.email}
          rightPadding={margin}
        />
        <Views.TextEdit
          type={Types.TTextEdit.CPF}
          placeHolder="CPF do responsável"
          bind:value={subscribeObject.identity}
          initialValue={subscribeObject.identity}
          bind:isValid={subscribeObjectValidation.cpf}
          leftPadding={margin}
        />
        <Views.TextEdit
          placeHolder="Senha"
          type={Types.TTextEdit.PASSWORD}
          bind:value={subscribeObject.password}
          bind:isValid={subscribeObjectValidation.password}
          rightPadding={margin}
          min={8}
          max={40}
          error="A senha deve ter um tamanho entre 8 e 40 caracteres e contendo no mínimo
        uma letra maiúscula, uma letra minúscula, um número e um símbolo"
        />
        <Views.TextEdit
          placeHolder="Confirmar a senha"
          type={Types.TTextEdit.PASSWORD}
          bind:value={subscribeObject.confirmPassword}
          bind:isValid={subscribeObjectValidation.confirmPassword}
          leftPadding={margin}
          error="A confirmação da senha não é válida"
          validation={validatePassword}
        />

        <Views.TextEdit
          type={Types.TTextEdit.ALPHA_NUMERIC}
          placeHolder="Código de indicação"
          initialValue={$Referral}
          bind:value={subscribeObject.referredBy}
        />
      </div>
    {:else if stage === 1}
      <h2>Endereço do estabelecimento</h2>

      {#if subscribeObject.address}
        <Views.TextEdit
          focus={true}
          type={Types.TTextEdit.CEP}
          callback={findAddress}
          buttonIcon={faSearch}
          bind:value={subscribeObject.address.postalCode}
          initialValue={subscribeObject.address.postalCode}
          bind:isValid={subscribeObjectValidation.address.postalCode}
          placeHolder="CEP do estabelecimento"
        />
      {/if}
      {#if subscribeObject.address}
        <Views.TextEdit
          disabled={true}
          type={Types.TTextEdit.SPACE_ALPHA_NUMERIC}
          placeHolder="Endereço"
          bind:this={inputs.address.street}
          bind:value={subscribeObject.address.street}
          bind:isValid={subscribeObjectValidation.address.street}
          initialValue={subscribeObject.address.street}
          min={2}
          max={255}
        />
      {/if}
      {#if subscribeObject.address}
        <Views.TextEdit
          type={Types.TTextEdit.ALPHA_NUMERIC}
          placeHolder="Número"
          bind:this={inputs.address.number}
          bind:value={subscribeObject.address.number}
          bind:isValid={subscribeObjectValidation.address.number}
          initialValue={subscribeObject.address.number}
          empty={!subscribeObjectValidation.address.postalCode}
          min={1}
          max={255}
        />
      {/if}
      {#if subscribeObject.address}
        <Views.TextEdit
          type={Types.TTextEdit.SPACE_ALPHA_NUMERIC}
          placeHolder="Complemento"
          bind:this={inputs.address.complement}
          bind:value={subscribeObject.address.complement}
          bind:isValid={subscribeObjectValidation.address.complement}
          initialValue={subscribeObject.address.complement}
        />
      {/if}
      {#if subscribeObject.address}
        <Views.TextEdit
          disabled={true}
          type={Types.TTextEdit.SPACE_ALPHA_NUMERIC}
          placeHolder="Bairro"
          bind:this={inputs.address.neighborhood}
          bind:value={subscribeObject.address.neighborhood}
          bind:isValid={subscribeObjectValidation.address.neighborhood}
          initialValue={subscribeObject.address.neighborhood}
          min={2}
          max={255}
        />
      {/if}
      {#if subscribeObject.address}
        <Views.TextEdit
          disabled={true}
          placeHolder="Cidade"
          bind:this={inputs.address.city}
          bind:value={subscribeObject.address.city}
          bind:isValid={subscribeObjectValidation.address.city}
          initialValue={subscribeObject.address.city}
          min={2}
          max={255}
        />
      {/if}
      {#if subscribeObject.address}
        <Views.TextEdit
          disabled={true}
          placeHolder="UF"
          bind:this={inputs.address.stat}
          bind:value={subscribeObject.address.stat}
          bind:isValid={subscribeObjectValidation.address.stat}
          initialValue={subscribeObject.address.stat}
          min={2}
          max={2}
        />
      {/if}
    {:else if stage === 2}
      <h2>Por favor informe seu número de telefone cadastrado</h2>
      <small>clique em "<b>Solicitar</b>" para solicitar o código de validação</small>
      <Views.TextEdit
        focus={true}
        type={Types.TTextEdit.PHONE}
        bind:value={subscribeObject.phone}
        initialValue={subscribeObject.phone}
        icon={faPhone}
        buttonName="Solicitar"
        callback={toggleshowRequestValidatingCodeAlert}
        buttonDisabled={!subscribeObjectValidation?.phone || !canRequestCode}
        bind:isValid={subscribeObjectValidation.phone}
        placeHolder="Número do telefone"
      />
      {#if !canRequestCode}
        <span>Caso não receber o código, espera {countdown} segundos para solicitar um novo!</span>
      {/if}
      <Views.TextEdit
        type={Types.TTextEdit.NUMBER}
        bind:value={subscribeObject.phoneValidationCode}
        icon={faUnlock}
        mask="_ _ _ _"
        buttonName="Confirmar"
        callback={ValidatePhoneCode}
        buttonDisabled={!subscribeObjectValidation?.phoneValidationCode}
        disabled={!subscribeObjectValidation?.canDigitValidationCode}
        bind:isValid={subscribeObjectValidation.phoneValidationCode}
        validation={validateValidationCode}
        placeHolder="Código de validação"
      />
      <Views.GTerms />
    {:else if stage === 3}
      <h2>Dados de pagamento</h2>
      <p>
        É importante usar um cartão de crédito que permite cobrança recorrente, igual o que você usa para contratar
        Netflix, para evitar eventual suspensão do serviço!
      </p>
      <div class="form-group">
        {#if subscribeObject.payment}
          <Views.TextEdit
            focus={true}
            type={Types.TTextEdit.NAME}
            placeHolder="Nome impresso no cartão"
            bind:value={subscribeObject.payment.holder}
            bind:isValid={subscribeObjectValidation.payment.holder}
            min={3}
            max={255}
            rightPadding={margin}
          />
        {/if}
        {#if subscribeObject.payment}
          <Views.TextEdit
            icon={cardBrandIcon}
            mask={cardNumberMask}
            type={Types.TTextEdit.NUMBER}
            maskKey="_"
            bind:value={subscribeObject.payment.number}
            bind:isValid={subscribeObjectValidation.payment.number}
            placeHolder="Número do cartão"
            leftPadding={margin}
            min={cardInfo?.lengths?.[0] ?? 6}
            max={cardInfo?.lengths?.[0] ?? 6}
          />
        {/if}
        {#if subscribeObject.payment}
          <Views.TextEdit
            type={Types.TTextEdit.NUMBER}
            mask="__/__"
            maskKey="_"
            placeHolder="Validade do cartão"
            bind:value={subscribeObject.payment.validity}
            bind:isValid={subscribeObjectValidation.payment.validity}
            rightPadding={margin}
            validation={validateCardValidation}
            error="A data de validade do cartão deve ser uma data válida (12/26) maior que a data atual."
          />
        {/if}
        {#if subscribeObject.payment}
          <Views.TextEdit
            type={Types.TTextEdit.NUMBER}
            mask={cardCodeMask}
            maskKey="_"
            placeHolder="Código de segurança"
            bind:value={subscribeObject.payment.code}
            bind:isValid={subscribeObjectValidation.payment.code}
            leftPadding={margin}
            min={cardInfo?.code?.size ?? 3}
            max={cardInfo?.code?.size ?? 3}
          />
        {/if}
      </div>
      <small>
        <p>
          Esta transação será processada pelo Assas de acordo com os
          <a target="_blank" href="https://ajuda.asaas.com/termos-de-uso" rel="noreferrer">termos e condições de uso</a>
          e
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfIZYUY5eLjn_LO0q2Zq5I0OH_KGCxU1DAde3CdsrjUukLH9Q/viewform"
            rel="noreferrer">política de privacidade</a
          >
          deles. Ao continuar, você reconhece e aceita estes termos e condições. Para autorizar seu cartão, as vezes uma
          pequena quantia será cobrada e reembolsada imediatamente.<br />Este site é protegido pela criptografia e somos
          dentro da conformidade de PCI DSS para protegir seus dados de pagamento e gerenciar seus pagamentos.<br />Ao
          clicar em enviar, certifique que todas as informações estão corretas.
        </p>
        <p>A cobrança é feita automaticamente mensalmente e pode ser cancelada a qualquer momento.!</p>
        <p>
          Ao continuar você concorda com os <Views.Link url="/termsOfUse">termos de uso</Views.Link>
          aplicáveis ao serviço contratado e confrma que leu a nossa
          <Views.Link url="/privacy">politica de privacidade</Views.Link>
        </p>
        <p>
          Devolvemos seu dinheiro 30 dias contando a partir do momento de contratação se você não gostar dos nossos
          serviços!
        </p>
      </small>
      <Views.GTerms />
    {/if}
    <Views.Divider />
    <div class="form-group buttons">
      {#if stage > 0}
        <Views.Button type={Types.TButton.TRANSPARENT} rightPadding={margin} on:click={doBack}>Voltar</Views.Button>
      {/if}
      <Views.Button disabled={!canProgress} leftPadding={stage > 0 ? margin : 0} on:click={doSubscribe}
        >{buttonNext}</Views.Button
      >
    </div>

    {#if showRequestValidatingCodeAlert}
      <Views.Alert
        title="Alerta"
        message={`Verifica se seu número de telefone inserido ${Utils.Strings.formatAsPhone(
          subscribeObject?.phone
        )} está correto para prosseguir`}
        closeCallBack={toggleshowRequestValidatingCodeAlert}
        buttons={[
          {
            name: 'Quero corrigir',
            callback: toggleshowRequestValidatingCodeAlert
          },
          {
            name: 'Está correto',
            callback: RequestPhoneValidation,
            principal: true
          }
        ]}
      />
    {/if}
  </div>
{/if}
<svelte:window bind:innerWidth={screenW} />

<style>
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
