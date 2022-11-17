<script lang="ts">
  import { Link } from 'svelte-navigator'
  import Carousel from 'svelte-carousel'
  import { Views, Stores } from '@ikomida/shared-frontend'
  import ShapeDivider from '../components/ShapeDivider.svelte'
  import { onMount } from 'svelte'
  import RequestContact from '../components/RequestContact.svelte'

  onMount(async () => {
    Stores.Loading.instance.stop()
  })
  Stores.Title.instance.set('')
</script>

<div style="background: rgba(53,1,1,1);">
  <div style="background-image: linear-gradient(90deg, #000000, #350101);">
    <Carousel autoplay={false} dots={false} autoplayDuration={5000} pauseOnFocus
      ><button slot="prev" let:showPrevPage on:click={showPrevPage} class="custom-arrow custom-arrow-prev">
        <i />
      </button>
      <div style="--image: url(/assets/images/carousel-slide-3.jpeg)" class="carousel">
        <div class="data">
          <h2>Tenha seu próprio APP</h2>
          <p>Nós lhe devolvemos a autoridade sobre seu negócio</p>
          <div class="you">
            <b>Você</b>
            <ul>
              <li><b>no controle</b></li>
              <li>escolhe seus motoboys</li>
              <li>controle seus descontos</li>
              <li>define sua taxa de entrega</li>
              <li>personalizae a cara do seu negócio</li>
            </ul>
          </div>
          <p>Não fique mais refém das políticas dos outros.</p>
        </div>
        <div class="screenshot">
          <Views.Image source="/assets/images/iphone iKomida-client-login.png" name="iKomida" />
        </div>
      </div>
      <div style="--image: url(/assets/images/carousel-slide-1.jpg)" class="carousel">
        <div class="data">
          <h2>Venda mais e pague menos<br />Chega de abuso de autoridade!</h2>
          <div class="stop">
            <Views.Image source="/assets/icons/stop-hand.svg" name="Chega de abuso de autoridade!" />
            <p>
              Por que pagar, além da mensalidade, taxas absurdas sobre suas vendas?!<br />Aqui você não paga nada mais
              que uma mensalidade
              <b>simbólica</b>.<br />Saia das sombras e se reinventa.<br />Vamos tornar seu negócio mais lucrativo.
            </p>
          </div>
        </div>
        <div class="screenshot">
          <Views.Image source="/assets/images/iphone iKomida-client-menu.png" name="iKomida" />
        </div>
      </div>
      <div class="carousel" style="--image: url(/assets/images/carousel-slide-5.jpg)">
        <div class="data">
          <h2>Saia na frente da concorrência</h2>
          <h3>fidelize os clientes</h3>
          <div class="fidelize">
            <p>
              Ter sua identidade no mundo digital nunca foi tão fácil.<br />
              Sabemos que para ter um negócio bem-sucedido você precisa de um leal público-alvo. Os apps de delivery atuais
              além de cobrarem taxas absurdas, têm uma ampla concorrência.<br />
              Tudo isso porque você ainda não tem um APP que é só seu.
            </p>
          </div>
        </div>
        <div class="screenshot">
          <Views.Image source="/assets/images/iphone iKomida-client-home.png" name="iKomida" />
        </div>
      </div>
      <div class="carousel" style="--image: url(/assets/images/carousel-slide-4.jpeg)">
        <div class="data">
          <h2>Custo benefício</h2>
          <h3>Nós temos a solução do seu problema</h3>
          <div class="fidelize">
            Para desenvolver um applicativo simples pra seu estabelecimento é bem caro e ficaria mais caro ainda se for
            pra ser dinâmico, gerenciar pagamentos, produtos e pedidos.<br />Por isso nós desenvolvemos uma plataforma
            que pensa em você (dono do estabelicimento) seguindo o modelo app sob demanda ou AaaS (App as a service).<br
            />Com isso você paga um valor mensal e nós disponibilizamos o seu app nas lojas Apple store e Google play,
            cofira
            <Link to="/plans">nossos pratos</Link>
          </div>
        </div>
        <div class="screenshot">
          <Views.Image source="/assets/images/iphone iKomida-client-product.png" name="iKomida" />
        </div>
      </div>
      <button slot="next" let:showNextPage on:click={showNextPage} class="custom-arrow custom-arrow-next">
        <i />
      </button>
    </Carousel>
  </div>
</div>
<ShapeDivider />
<Views.Divider height={60} />
<div class="container">
  <RequestContact />
  <Views.Divider height={60} />
  <h2 class="sectionsTitle">POR QUE PRECISA TER SEU PRÓPRIO APP???</h2>
  <section class="boxes">
    <article>
      <h3>Lucro</h3>
      <p>
        Não sofra mais com taxas abusivas.<br />Aqui você paga 0% sobre suas vendas.
      </p>
    </article>
    <article>
      <h3>Layout</h3>
      <p>
        Quer app com sua cara?<br />Aqui o app é seu e você quem define seu layout
      </p>
    </article>
    <article>
      <h3>Controle</h3>
      <p>
        O controle sobre seu app é importante.<br />Aqui você é o dono. Você define e controla tudo.
      </p>
    </article>
    <article>
      <h3>Fidelidade</h3>
      <p>
        Garanta a fidelidade dos seus clientes<br />Com um app da sua marca, os clientes vão sempre lembrar de você.
      </p>
    </article>
    <article>
      <h3>Comunicação</h3>
      <p>
        Tem produto ou desconto novo?<br />Então é só mandar um push que todos os seus clientes recebem na hora
      </p>
    </article>
  </section>
  <Views.Divider height={60} />
  <Link to="/plans">
    <Views.Button>Turbine agora as vendas do seu estabelecimento</Views.Button>
  </Link>
  <Views.Divider height={60} />
  <h2 class="sectionsTitle">Feito para você</h2>
  <section class="slide slide1">
    <div>
      <h3>Você dono do negocio</h3>
      Aqui pensamos no seu negocio, sabemos que cada um tem o seu jeito de fazer os negocios, por isso trouxemos essa nova
      ideia para revolucionar o jeito que você está sendo tratado; de agora em diante viemos para te ajudar a obter o controle
      de volta e trazer mais ganhos proporcionado com mais vendas e clientes.
    </div>
    <div>
      <Views.Image source="/assets/images/restaurante-owner.jpg" name="" />
    </div>
  </section>
  <section class="slide slide2">
    <div>
      <Views.Image source="/assets/images/restaurante-app-dev.jpeg" name="" />
    </div>
    <div>
      <h3>Ter seu proprio app não é mais aquele bicho de 7 cabeças</h3>
      Com a nossa tecnologia e estratégia, conseguimos trazer um app sob medida para todos os restaurantes do brasil, não
      precisa mais se preocupar com o orçamento para poder desenvolver o app da sua marca. nossa solução lhe traz além de
      um app customizado, outros benefícios como: e-commerce, vitrine para seus produtos, perfil de clientes, e muito mais.
    </div>
  </section>
  <section class="slide slide3">
    <div>
      <h3>Marketing digital</h3>
      Alèm de você ter o seu proprio app, você contará com a nossa consultoria para fazer seu negocio crescer mais ainda,
      e alcançar mais clientes que não teria como conhecer seu negocio sem você aparecer.
    </div>
    <div>
      <Views.Image source="/assets/images/thinking-hamburger.jpeg" name="" />
    </div>
  </section>
  <Views.Divider height={60} />
  <RequestContact />
</div>

<style>
  button {
    background-color: transparent;
    border: 0;
  }
  .container > .slide {
    display: flex;
  }
  .container > .slide > * {
    width: 50%;
  }
  .carousel {
    min-height: calc(100vh);
    max-height: 100vh;
    /* background-image: var(--image); */
    display: flex;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: cover, contain;
    align-items: center;
    place-content: center;
  }
  .carousel > .screenshot {
    width: 30%;
    max-width: 30%;
    max-height: 50%;
    display: flex;
    align-items: flex-start;
    padding: 0;
  }
  .carousel > .screenshot > :global(img) {
    max-height: 100%;
    object-fit: contain;

    overflow: hidden;
    transform: rotate(-9deg);
  }
  .carousel > div.data {
    text-shadow: 0pt 4pt 8pt #18056b99;
    color: #fff;
    padding: 40pt;
    /* background: #00000085; */
    width: 60%;
    align-items: center;
    display: flex;
    flex-direction: column;
    place-content: center;
    font-size: 12pt;
  }
  .carousel > div > .fidelize {
    max-width: 60%;
    font-size: 1.3em;
    margin-top: 32pt;
  }
  .carousel > div > h2 {
    /* font-size: 2.5em;
    line-height: 1em; */
    margin-bottom: 32pt;
  }
  .carousel > div > p {
    font-size: 1.5em;
  }

  .carousel > div > .stop {
    text-align: left;
    display: flex;
    /* width: 70%; */
  }
  .carousel > div > .stop > :global(img) {
    max-width: 25%;
    object-fit: fill;
    margin-right: 16pt;
  }
  .carousel > div > .you {
    text-align: left;
    display: flex;
    /* width: 70%; */
  }
  .carousel > div > .you > ul {
    list-style: none;
    margin-left: 0;
    padding-left: 12pt;
    font-size: 1.2em;
  }
  .carousel > div > .you > ul > li {
    margin-left: 0;
  }
  .carousel > div > .you > b {
    font-family: RobotoBold;
    font-size: 7em;
    color: #e8d130;
    padding-top: 16pt;
    text-shadow: 0pt 4pt 8pt #ffffff6b;
  }
  .custom-arrow {
    width: 16pt;
    background-color: #000000;
    opacity: 0.3;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    transition: opacity 150ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .custom-arrow-next {
    right: 0;
  }
  .custom-arrow-prev {
    left: 0;
  }
  .custom-arrow > i {
    border: solid #a29696;
    border-width: 0 8pt 8pt 0;
    padding: 8pt;
    position: relative;
  }
  .custom-arrow-next > i {
    transform: rotate(-45deg);
    left: -4pt;
  }
  .custom-arrow-prev > i {
    transform: rotate(135deg);
    right: -4pt;
  }

  section.boxes {
    display: flex;
    flex-wrap: wrap;
  }
  section.boxes > article {
    flex: 1;
    padding: 16pt;
    border-radius: 8pt;
    margin: 8pt;
    width: 33%;
    display: flex;
    flex-direction: column;
    flex-basis: 29%;
    text-shadow: 0.8pt 1pt #cccccc55;
    box-shadow: 0 4pt 8pt #0000009e;
    background: #cccccc25;
    color: #190101;
  }
  section.boxes > article > p {
    width: 100%;
    /* font-size: 1.2em; */
    font-family: RobotoBold;
    text-align: center;
  }
  section.boxes > article > h3 {
    width: 100%;
    /* font-size: 2em; */
    color: #ff0000;
    text-align: center;
    /* line-height: 1em; */
  }
  .container > .slide > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    place-content: center;
  }
  .sectionsTitle {
    line-height: 1em;
    color: #4c0708;
    /* font-size: 2em; */
    margin-bottom: 16pt;
  }

  .container > .slide h3 {
    /* font-size: 2.5em; */
    margin-bottom: 32pt;
    /* line-height: 1em; */
  }
  @media screen and (max-width: 816pt) {
    .carousel {
      min-height: calc(100vh - 148pt);
      position: relative;
      overflow: hidden;
    }
    .carousel > .screenshot {
      width: 100%;
      max-width: 40%;
      max-height: 50%;
      display: flex;
      align-items: flex-start;
      padding: 0;
      overflow: hidden;
      position: absolute;
      right: -23vw;
      top: 35vh;
      overflow: hidden;
      transform: rotate(-9deg);
      order: 0;
      z-index: 99;
    }
    .carousel > .screenshot > .iphone,
    .carousel > .screenshot > :global(img),
    .carousel > .screenshot > .iphone > :global(img) {
      max-height: 100%;
      object-fit: contain;

      overflow: none;
      transform: none;
    }

    .carousel > div.data {
      order: 1;
      width: 80%;
      z-index: 999;
      padding-left: 0pt;
    }
    .carousel > div > .you > b {
      font-size: 2em;
    }
    section.boxes > article {
      margin-top: 16pt;
      width: 100%;
      flex-basis: 100%;
    }
    .carousel > div {
      padding: 16pt;
    }
    .carousel > div > .fidelize {
      max-width: 100%;
      font-size: 1.3em;
      margin-top: 32pt;
    }
    .carousel > div > h2 {
      font-size: 2em;
      line-height: 1em;
    }
    .carousel > div > p {
      font-size: 1.5em;
    }
    .carousel > div > .you {
      text-align: center;
      display: block;
      /* width: 70%; */
    }
    .carousel > div > .you > ul {
      list-style: circle;
      margin: 0;
      padding: 16pt;
      font-size: 1.2em;
    }
    .carousel > div > .stop {
      text-align: center;
      display: block;
      /* width: 70%; */
    }
    .carousel > div > .stop > :global(img) {
      max-width: 40%;
      object-fit: fill;
      margin: 16pt;
    }
    .container > .slide {
      flex-direction: column;
    }
    .container > .slide > * {
      margin-top: 32pt;
      width: 100%;
    }
    .container > .slide.slide1 > :global(img) {
      order: 1;
    }
    .container > .slide.slide1 > div {
      order: 2;
    }
    .container > .slide.slide3 > :global(img) {
      order: 1;
    }
    .container > .slide.slide3 > div {
      order: 2;
    }
  }
</style>
