<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set('Apps')
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  <div class="header">
    <h3>Um só app que você precisa para que tudo dê certo.</h3>
    <p>
      Disponibilizamos um app completo nas principais lojas de aplicativos para Android e iOS (iPhone), para que você
      possa gerenciar seu negócio de uma maneira bem simples, eficiente e sem complicações.
    </p>
  </div>
</div>
<div class="container">
  <div class="links">
    <h1>Baixe iKomida Dashboard App</h1>
    <div>
      <Views.Link url="https://apps.apple.com/app/ikomida-dashboard/id1639129162">
        <Views.Image source="assets/images/button-appstore.png" />
      </Views.Link>
      <Views.Link url="https://play.google.com/store/apps/details?id=com.ikomida.br.vendor">
        <Views.Image source="assets/images/button-googleplay.png" />
      </Views.Link>
    </div>
  </div>
  <Views.Divider />
  <RequestContact />
</div>

<style>
  .container {
    min-height: 300px;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    padding: 30px;
    background: #cccccc33;
    min-height: 300px;
    border: 1px solid #cccccc44;
    border-radius: 10px;
  }
  .links > div {
    display: flex;
    flex-direction: row;
  }
  .links > div > :global(a) {
    margin: 20px;
  }
  @media screen and (max-width: 820px) {
    .links > div {
      display: flex;
      flex-direction: column;
    }
  }
</style>
