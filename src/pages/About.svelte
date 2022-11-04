<script lang="ts">
  import { Views, Stores } from '@ikomida/shared-frontend'
  import Divider from '@ikomida/shared-frontend/lib/components/Divider.svelte'
  import { onMount } from 'svelte'
  import RequestContact from '../components/RequestContact.svelte'
  import ShapeDivider from '../components/ShapeDivider.svelte'

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set('Sobre')
</script>

<ShapeDivider />
<Views.Divider />
<div class="container">
  <div class="header">
    <h3>Uma empresa de tecnologia que pensa em você.</h3>
    <p>
      TI Alto Nível, é uma empresa fundada em 2017, e registrada sob CNPJ N˚ 28.994.111/0001-80 por incentivos para
      atender demandas de desenvolvimento de software que a empresa vem fazendo com muito sucesso até agora que pensamos
      em desenvolver o nosso próprio produto e atender uma parte muito importante da sociedade, facilitando o acesso a
      tecnologia que é geralmente cara, o que fará a posse de uma pequena fatia que pode pagar milhões para desenvolver
      seus apps.
    </p>
  </div>
</div>
<div class="jumbotron">
  <div>
    <h1>Assim como você, gostamos de comer coisas boas!</h1>
    Por isso nós valorizamos os restaurantes, sem esses estabelecimentos muita gente não teria comida fácil para jantar,
    e muitos não teriam como fazer aquele jantar romântico à luz de velas na sua casa de última hora.<br />
    Assim surgiu essa ideia de recompensar esse esforço e ajudar esses estabelecimentos maravilhosos a crescer e aparecer.
  </div>
  <div>
    <Views.Image source="/assets/images/about-1.jpg" name="Sobre iKomida" />
  </div>
</div>
<div class="container">
  <h1>Viemos para resolver seu problema</h1>
  <p>
    Desde o inicio do nascimento desse projeto, pensamos em resolver os problemas que encontramos conversando com donos
    de estabelecimentos, ouvindo as dores deles e os desafios que eles enfrentam em busca de escalar suas vendas, isso
    não é fácil com as soluções atuais nesse mercado, e através disso mastigamos todas essas dores e trazemos esse bebê
    que vai alegrar muita gente para vida.
  </p>
  <Views.Divider />
  <RequestContact />
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
