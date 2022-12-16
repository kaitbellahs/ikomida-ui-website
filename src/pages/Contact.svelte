<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import Description from '../stores/Description'

  function openWhatsapp() {
    window.open('https://wa.me/5511945930909', '_blank')?.focus()
  }

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set(`Contato`)
  Description.instance.set(
    `Vamos ficar muito felizes em receber seu contato, seja feedback, elogios ou reclamações, nós vamos priorizar cada contato que recebemos.`
  )
</script>

<ShapeDivider />
<Views.Divider />
<container>
  <div class="shadowedBox header">
    <h3>Entre em contato conosco hoje e agora mesmo.</h3>
    <p>
      Pensando no seu conforto, oferecemos vários meios de comunicação, começando pelo email, passando pelo whatsapp e
      telefone e terminando pelo contato presencial.
    </p>
    <Views.Button on:click={openWhatsapp}>Nos chama no whatsapp agora</Views.Button>
  </div>
</container>
<div class="jumbotron">
  <div>
    <h1>E pra facilitar!</h1>
    Você também pode nos ligar nesse numero (11) 94593-0909 ou nos mandar um email nesse endereço eletrônico contact@tialtonivel.com.br
  </div>
  <div>
    <Views.Image source="/assets/images/contactUs.jpg" name="Entre em contato com iKomida" />
  </div>
</div>
<Views.Divider />
<container>
  <RequestContact />
</container>

<style>
  .jumbotron {
    max-height: 904pt;
    min-height: 480pt;
    display: flex;
    flex-direction: row;
    place-items: center;
  }
  .jumbotron > * {
    flex: 1;
    padding: 16pt;
    margin: 16pt;
    width: 50%;
    flex-basis: 40%;
  }
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

  @media screen and (max-width: 816pt) {
    .jumbotron {
      flex-direction: column;
    }
    .jumbotron > * {
      width: calc(100% - 16pt);
      flex-basis: 100%;
    }
  }
</style>
