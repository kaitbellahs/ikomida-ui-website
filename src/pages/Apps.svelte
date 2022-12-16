<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { onMount } from 'svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import Description from '../stores/Description'

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set('Apps')
  Description.instance.set(`Um só app que você precisa para que tudo dê certo.
        Disponibilizamos um app completo nas principais lojas de aplicativos para Android e iOS (iPhone), para que você
      possa gerenciar seu negócio de uma maneira bem simples, eficiente e sem complicações.`)
</script>

<ShapeDivider />
<Views.Divider />
<container>
  <div class="shadowedBox header">
    <h3>Um só app que você precisa para que tudo dê certo.</h3>
    <p>
      Disponibilizamos um app completo nas principais lojas de aplicativos para Android e iOS (iPhone), para que você
      possa gerenciar seu negócio de uma maneira bem simples, eficiente e sem complicações.
    </p>
  </div>
</container>
<container>
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
</container>

<style>
  container {
    min-height: 304pt;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
    padding: 32pt;
    background: #cccccc33;
    min-height: 304pt;
    border-radius: 8pt;
  }
  .links > div {
    display: flex;
    flex-direction: row;
  }
  .links > div > :global(a) {
    margin: 16pt;
  }
  @media screen and (max-width: 816pt) {
    .links > div {
      display: flex;
      flex-direction: column;
    }
  }
</style>
