<script lang="ts">
  import { Views, Stores, Types } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import { useLocation } from 'svelte-navigator'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  let location = useLocation()
  let contractResult: Types.Classes.CContractResult | undefined = undefined
  let isPromotion: boolean
  function openBankSlip() {
    window.open(contractResult?.bankSlipUrl, '_blank')
  }
  function unsecuredCopyToClipboard(text: string) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (err) {
      Stores.MessageAlert.instance.show(
        'Não foi possível copiar o código PIX para sua área de transferência, por favor realize a tarefa manualmente.'
      )
      return false
    } finally {
      document.body.removeChild(textArea)
    }
    Stores.MessageAlert.instance.show(
      'O código PIX foi copiado para sua área de transferência, agora pode ir até o app do seu banco e colá-lo lá.'
    )
    return true
  }
  async function copyQrCode() {
    if (window.isSecureContext && navigator.clipboard) {
      window.navigator.clipboard.writeText(contractResult?.pix?.payload ?? '').then(
        function () {
          Stores.MessageAlert.instance.show(
            'O código PIX foi copiado para sua área de transferência, agora pode ir até o app do seu banco e colá-lo lá.'
          )
        },
        function (err) {
          Stores.MessageAlert.instance.show(
            'Não foi possível copiar o código PIX para sua área de transferência, por favor realize a tarefa manualmente.'
          )
        }
      )
    } else {
      unsecuredCopyToClipboard(contractResult?.pix?.payload ?? '')
    }
  }
  $: console.log('$location.state:', $location.state)
  onMount(async () => {
    contractResult = Types.Classes.CContractResult.fromObject($location.state.data)
    isPromotion = $location.state.isPromotion
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set(`Resultado`)
</script>

<ShapeDivider />
<Views.Divider />
<div class="shadowedBox container">
  <h1>Parabéns</h1>
  <p>Fala parceiro {contractResult?.name}</p>
  <p>
    Posso te chamar de parceiro? pois é, agora você faz parte da nossa comunidade de empresário a busca do sucesso e já
    tomei a liberdade de te chamar de parceiro.
  </p>
  <p>
    {#if contractResult?.billingType !== Types.Types.Asaas.TAsaasBilling.CREDIT_CARD && !isPromotion}
      Agora você só precisa pagar a primeira mensalidade para efetivar o seu contrato, ter seu próprio app e usufruir de
      todas as funcionalidades da plataforma iKomida.
      <Views.Divider />
      {#if contractResult?.billingType === Types.Types.Asaas.TAsaasBilling.PIX}
        <div class=" pix">
          <div class="shadowedBox">
            <h2>PIX QrCode</h2>
            <Views.Divider />
            <small
              >Acesse seu APP de pagamentos e faça a leitura do QR Code ao lado para efetuar o pagamento de forma rápida
              e segura.</small
            >
            <Views.Divider />
            <Views.Image source={`data:image/jpeg;base64,${contractResult.pix?.encodedImage}`} />
          </div>
          <div class="shadowedBox">
            <h2>PIX Código</h2>
            <Views.Divider />
            <div class="code">{contractResult.pix?.payload}</div>
            <Views.Divider />
            <Views.Button on:click={copyQrCode}>Copiar o código</Views.Button>
          </div>
        </div>
      {:else if contractResult?.billingType === Types.Types.Asaas.TAsaasBilling.BOLETO}
        <h2>Boleto bancário para pagamento</h2>
        <Views.Divider />
        <Views.Button on:click={openBankSlip}>Abrir Boleto</Views.Button>
      {:else}
        Entre em contato conosco.
      {/if}
    {:else}
      Seu contrato foi efetivado com sucesso, agora você vai ter seu próprio app e usufruir de todas as funcionalidades
      da plataforma iKomida.
    {/if}
  </p>
  <p>
    {#if contractResult?.billingType !== Types.Types.Asaas.TAsaasBilling.CREDIT_CARD}
      Agora
    {:else}
      Após efetivar o pagamento
    {/if} é só aguardar, você receberá atualizações referente a situação de desenvolvimento do seu app, isso pode levar até
    15 dias úteis dependendo das aprovações nas lojas de aplicativos, e em breve você receberá um email de boas vindas com
    instruções para acessar nosso app iKomida dashboard para poder começar já a popular dados e produtos e ajustar as configurações,
    e por enquanto só isso, nós vamos fazer o resto.<br />
    Ah se nós precisarmos de alguma informação vamos entrar em contato com você, usando os dados que você preencheu, no momento
    da contratação dos nossos serviços.
  </p>
</div>

<style>
  .pix {
    display: flex;
    flex-direction: row;
  }
  .pix > div {
    flex: 1 50%;
    width: 50%;
    overflow: hidden;
    word-wrap: break-word;
  }
  .pix > div:first-of-type {
    margin-right: 8pt;
  }
  .pix > div:last-of-type {
    margin-left: 8pt;
  }
  .pix > div > :global(img) {
    max-width: 128pt;
  }
  .container > p {
    text-indent: 1rem;
  }
  @media screen and (max-width: 816pt) {
    .pix {
      flex-direction: column;
    }
    .pix > div {
      flex: 1 100%;
      width: 100%;
    }
    .pix > div:first-of-type,
    .pix > div:last-of-type {
      margin: 0;
    }
  }
</style>
