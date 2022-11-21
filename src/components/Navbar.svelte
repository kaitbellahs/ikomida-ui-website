<script lang="ts">
  import { Views } from '@ikomida/shared-frontend'
  import { Link, useLocation, navigate } from 'svelte-navigator'

  const location = useLocation()
  $: isProd = ['ikomida.com', 'ikomida.com.br', 'www.ikomida.com', 'www.ikomida.com.br'].includes(window.location.host)

  let showMenu = false
  let screenY: number
  let screenH: number
  $: background = screenY > 50 || $location?.pathname !== '/' ? 'background' : ''
  $: shadow = screenY > screenH || ($location?.pathname !== '/' && screenY > 50) ? 'shadow' : ''
  $: style = `${background} ${shadow}`
  function toggleMenu() {
    showMenu = !showMenu
  }
  function goHome() {
    if ($location?.pathname !== '/') {
      navigate('/', {
        state: { from: $location.pathname },
        replace: true
      })
    }
  }
</script>

<header class={style}>
  <div id="nonProduction" class={!isProd ? 'show' : ''}>
    Este é uma ambiente de testes e tudo o que acontece aqui não tem valor<br /><small
      ><Views.Link url="https://www.ikomida.com" alt="iKomida">ir para site oficial</Views.Link></small
    >
  </div>
  <div class="mobile">
    <div on:click={toggleMenu}>
      <div />
      <div />
      <div />
    </div>
    <img on:click={goHome} class="" src="/assets/icons/transparent-logo-2.svg" alt="iKomida" />
  </div>
  <nav class={showMenu ? 'show' : ''} style="--dropFromHeight: {isProd ? '10' : '110'}pt;" on:click={toggleMenu}>
    <ul>
      <li class="logo">
        <img on:click={goHome} class="" src="/assets/icons/transparent-logo-1.svg" alt="iKomida" />
      </li>
      <li>
        <Link class="link" to="/">Home</Link>
      </li>
      <li>
        <Link class="link" to="/features">Funcionalidades</Link>
      </li>
      <li>
        <Link class="link" to="plans">Planos</Link>
      </li>
      <li>
        <Link class="link" to="calculator">Quanto economizaria?</Link>
      </li>
      <li>
        <Link class="link" to="contact">Contato</Link>
      </li>
      <li>
        <Link class="link" to="apps">Apps</Link>
      </li>
      <li id="menuRights">
        Um produto da <Views.Link url="https://tialtonivel.com.br">Ti Alto Nivel</Views.Link>
      </li>
      <!-- <li>
          <Link class="link" to="blog">Blog</Link>
        </li> -->
    </ul>
  </nav>
</header>
<svelte:window bind:scrollY={screenY} bind:innerHeight={screenH} />

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 4pt 8pt #0000009e;
  }
  header > #nonProduction {
    display: none;
    width: 100%;
    border: 1pt solid red;
    color: black;
    background: yellow;
    padding: 16pt;
    text-align: center;
    color: rgb(53, 1, 1);
  }
  header > #nonProduction.show {
    display: block;
  }
  header.background {
    background-image: linear-gradient(90deg, #000000, #350101);
  }
  header.shadow {
    box-shadow: 0 4pt 8pt #0000009e;
  }
  header > nav {
    flex-shrink: 0;
    /* background-color: #202020; */
    font-size: 28pt;
    color: #a80000;
    margin: 16pt;
    padding: 0;
    display: flex;
    max-height: 72pt;
    text-transform: uppercase;
    place-content: center;
  }
  header > div.mobile {
    display: none;
  }
  header > nav > ul > li > :global(.link) {
    color: #fff;
    padding: 0pt 8pt 0pt 8pt;
    align-items: center;
    display: flex;
  }
  header > nav > ul {
    display: inline-flex;
    list-style: none;
    font-size: 0;
    margin: 0;
    height: 72pt;
    width: 1024pt;
    place-content: space-between;
  }
  header > nav > ul > li#menuRights {
    display: none;
  }
  header > nav > ul > li {
    cursor: pointer;
    font-size: 28pt;
    margin: 0;
    padding: 0pt;
    display: inline;
    height: 100%;
    width: auto;
    text-decoration: none;
    display: flex;
  }
  header > nav > ul > li > img {
    margin-right: 16pt;
    object-fit: contain;
  }
  @media screen and (max-width: 816pt) {
    header > div.mobile {
      display: flex;
      flex-direction: row;
      height: 56pt;
      align-items: center;
    }
    header > div.mobile > div {
      display: block;
      height: 40pt;
      width: 38pt;
      overflow: hidden;
      margin-top: 0;
      margin-left: 16pt;
      /* background: black; */
    }
    header > div.mobile > img {
      margin: auto;
      max-height: 100%;
      padding: 8pt;
    }
    header > div.mobile > div > div {
      margin-top: 8pt;
      background: #fff;
      display: block;
      width: 100%;
      height: 4pt;
      border-radius: 4pt;
    }
    header > nav {
      position: fixed;
      left: -100%;
      min-height: calc(100vh - var(--dropFromHeight));
      background: #cccccc33;
      min-width: 100%;
      transition: left 300ms;
      bottom: -56pt;
      max-width: 100%;
    }
    header > nav > ul {
      background-color: #000000dd;
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      min-width: 90%;
      max-width: 90%;
      height: 100%;
      overflow: hidden;
      padding-top: 12pt;
      font-size: 1.2em;
      overflow-y: scroll;
      padding-bottom: 0;
      box-shadow: 0 4pt 8pt #0000009e;
      min-height: calc(100vh - var(--dropFromHeight) - 56pt);
      max-height: calc(100vh - var(--dropFromHeight) - 56pt);
      place-content: flex-start;
    }
    header > nav > ul > li {
      padding: 12pt 16pt;
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      /* flex-grow: 1; */
    }
    header > nav > ul > .logo {
      display: none;
    }
    header > nav.show {
      left: -32pt;
    }
    header > nav > ul > li:last-of-type {
      align-items: flex-end;
      display: inline-flex;
      /* position: absolute; */
      /* left: 0; */
      /* border-bottom: 0; */
      /* bottom: 72pt; */
      color: white;
      font-size: 0.9em;
      text-align: center;
      /* width: 75%; */
      text-transform: none;
    }
  }
</style>
