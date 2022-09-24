<script lang="ts">
  import { Views, Utils, Stores, Types } from '@ikomida/shared-frontend';
  import ShapeDivider from '../components/ShapeDivider.svelte';
  import { onMount } from 'svelte';
  import { getPrivacyPolicy } from '../network/Terms';
  let term: Types.Classes.CTerm;

  onMount(async () => {
    term = await getPrivacyPolicy();
    Stores.Loading.instance.stop();
  });
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  {#if term}
    <div class="jambtron">
      <h1>{term?.name}</h1>
      <Views.Divider />
      <h2>id: #{term?.id}</h2>
      <h3>
        Grava esse código de identificação em algum lugar, ele é a identificação do termo que você está assinando.
      </h3>
    </div>
    <div class="content">
      {@html term?.text}
    </div>
    <Views.Divider />
    <Views.Divider />
    <small>Data da publicação: {Utils.Strings.dateToDateString(term.createdAt)}</small>
  {:else}
    <h2 class="error">
      Ocorreu um erro, Não foi possível obter a política de privacidade, por motivo de um erro interno do serviço ou
      falha na conexão à rede internet, tente novamente mais tarde ou entre em contato com a gente
    </h2>
  {/if}
</div>

<style>
  .jambtron {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    place-content: center;
    margin-bottom: 30px;
    min-height: 20vh;
    background: #cccccc25;
    border-radius: 10px;
    box-shadow: 1px 2px #cccccc33;
    width: 100%;
    max-width: 1024px;
    padding: 30px;
  }
  .jambtron > h1 {
    align-self: center;
    place-self: center;
  }
  .container {
    text-align: justify;
  }
  .container > * {
    text-align: justify;
  }
  .container > h2 {
    font-size: 1.5em;
    text-align: center;
  }
  .container > .content,
  .container > small {
    text-align: justify;
  }
</style>
