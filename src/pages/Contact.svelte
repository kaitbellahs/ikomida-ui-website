<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  function openWhatsapp() {
    window.open('https://wa.me/5511945930909', '_blank')?.focus()
  }

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  <div class="header">
    <h3>Entre em contato conosco hoje e agora mesmo.</h3>
    <p>
      Pensando no seu conforto, oferecemos vários meios de comunicação, começando pelo email, passando pelo whatsapp e
      telefone e terminando pelo contato presencial.
    </p>
    <Views.Button on:click={openWhatsapp}>Nos chama no whatsapp agora</Views.Button>
  </div>
</div>
<div class="jumbotron">
  <div>
    <h1>E pra facilitar!</h1>
    Você também pode nos ligar nesse numero (11) 94593-0909 ou nos mandar um email nesse endereço eletrônico contact@tialtonivel.com.br
  </div>
    <div>
  <Views.Image source="/assets/images/contactUs.jpg" name="Entre em contato com iKomida" />
    </div>div>
</div>

<style>
  .jumbotron {
    max-height: 900px;
    min-height: 480px;
    display: flex;
    flex-direction: row;
    place-items: center;
  }
  .jumbotron > * {
    flex: 1;
    padding: 10px;
    margin: 10px;
    width: 50%;
    flex-basis: 40%;
    /* text-shadow: 0.5px 1px #00000055;
    box-shadow: 2px 3px #00000099; */
  }
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
  .header > h3 {
    /* font-size: 1.6em; */
  }

  @media screen and (max-width: 820px) {
    .jumbotron {
      flex-direction: column;
    }
    .jumbotron > * {
      width: calc(100% - 20px);
      flex-basis: 100%;
    }
  }
</style>
