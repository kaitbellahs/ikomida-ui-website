<script lang="ts">
  import { useLocation } from 'svelte-navigator';
  import { Views, Stores } from '@ikomida/shared-frontend';
  import ShapeDivider from '../components/ShapeDivider.svelte';
  import { onMount } from 'svelte';

  const location = useLocation();
  function onClick() {
    const url = `com.ikomida.br.vendor://pagseguro.integration.callback${$location?.search}`;
    window.location.href = url;
  }

  onMount(async () => {
    Stores.Loading.instance.stop();
  });
</script>

<ShapeDivider />
<Views.Divider />

<h2>Quase pronto</h2>
<div class="container">
  <Views.Divider />
  Agora só
  <Views.Divider />
  <Views.Button sizeMultiplier={0.9} on:click={onClick}>clique aqui</Views.Button>
  <Views.Divider />e vamos te levar de volta para o app para completar a sua integração com pagseguro
</div>

<style>
</style>
