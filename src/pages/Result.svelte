<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set(`Resultado`)
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  <h1>Parabéns</h1>
  <p>
    Agora é só aguardar, você receberá atualizações referente a situação de desenvolvimento do seu app, isso pode levar
    até 15 dias úteis dependendo das aprovações nas lojas de aplicativos, e em breve você receberá um email de boas
    vindas com instruções para acessar nosso app iKomida dashboard para poder começar já a popular dados e produtos e
    ajustar as configurações, e por enquanto só isso, nós vamos fazer o resto.<br />
    Ah se nós precisarmos de alguma informação vamos entrar em contato com você, usando os dados que você preencheu, no momento
    da contratação dos nossos serviços.
  </p>
</div>

<style>
  .container > p {
    text-align: justify;
  }
</style>
