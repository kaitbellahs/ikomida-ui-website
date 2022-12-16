<script lang="ts">
  import { Views } from '@ikomida/shared-frontend'
  import { Link, useLocation, navigate } from 'svelte-navigator'

  const location = useLocation()
  $: isProd = [
    // '127.0.0.1:8080',
    // '0.0.0.0:8080',
    // '192.168.1.104:8080',
    'ikomida.com',
    'ikomida.com.br',
    'www.ikomida.com',
    'www.ikomida.com.br'
  ].includes(window.location.host)

  let showMenu = false
  let activateBackground = false
  $: styles = activateBackground ? 'background shadow' : ''
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
  function sceenScroll() {
    const doc = document.documentElement
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
    activateBackground = top > 24
  }
</script>

<header class={styles} on:scroll={sceenScroll}>
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
    <img on:click={goHome} class="" src="/assets/icons/logo.svg" alt="iKomida" />
  </div>
  <container class="navigation">
    <nav class={showMenu ? 'show' : ''} style="--dropFromHeight: {isProd ? '10' : '110'}pt;" on:click={toggleMenu}>
      <div class="logo">
        <img on:click={goHome} class="" src="/assets/icons/logo.svg" alt="iKomida" />
      </div>
      <ul>
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
  </container>
</header>

<svelte:window on:scroll={sceenScroll} />

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 9999;
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
  header > div.mobile {
    display: none;
  }
  header > container > nav {
    transition: all 0.3s;
    flex-shrink: 0;
    color: #a80000;
    padding: 8pt 0;
    place-content: space-between;
    display: flex;
    max-height: 56pt;
    text-transform: capitalize;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  header > container > nav > div.logo > img {
    object-fit: contain;
    max-height: 32pt;
    height: 32pt;
  }
  header > container > nav > ul {
    display: inline-flex;
    list-style: none;
    margin: 0;
    place-content: space-between;
    position: relative;
    font-size: 16pt;
  }
  header > container > nav > ul > li {
    cursor: pointer;
    margin: 0;
    padding: 0pt;
    display: inline;
    height: 100%;
    width: auto;
    text-decoration: none;
    display: flex;
  }
  header > container > nav > ul > li:hover {
    text-decoration: underline;
  }
  header > container > nav > ul > li#menuRights {
    display: none;
  }
  header > container > nav > ul > li > :global(.link) {
    color: #fff;
    padding: 0pt 8pt 0pt 8pt;
    align-items: center;
    display: flex;
  }
  @media screen and (max-width: 816pt) {
    header > div.mobile {
      display: flex;
      flex-direction: row;
      height: 56pt;
      align-items: center;
    }
    header > div.mobile > img {
      margin: auto;
      max-height: 100%;
      padding: 8pt;
    }
    header > div.mobile > div {
      display: block;
      height: 40pt;
      width: 38pt;
      overflow: hidden;
      margin-top: 0;
      margin-left: 16pt;
    }
    header > div.mobile > div > div {
      margin-top: 8pt;
      background: #fff;
      display: block;
      width: 100%;
      height: 4pt;
      border-radius: 4pt;
    }
    header > container > nav {
      position: fixed;
      left: -100%;
      min-height: calc(100vh - var(--dropFromHeight));
      background: #cccccc33;
      min-width: 100%;
      transition: left 300ms;
      bottom: -32pt;
      max-width: 100%;
    }
    header > container > nav.show {
      left: -6pt;
    }
    header > container > nav > .logo {
      display: none;
    }
    header > container > nav > ul {
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
      overflow-y: scroll;
      padding-bottom: 0;
      box-shadow: 0 4pt 8pt #0000009e;
      min-height: calc(100vh - var(--dropFromHeight) - 56pt);
      max-height: calc(100vh - var(--dropFromHeight) - 56pt);
      place-content: flex-start;
    }
    header > container > nav > ul > li {
      padding: 12pt 16pt;
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
    }
    header > container > nav > ul > li:last-of-type {
      align-items: flex-end;
      display: inline-flex;
      color: white;
      font-size: 0.9em;
      text-align: center;
      text-transform: none;
    }
  }
</style>
