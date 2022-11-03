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
  <div id="nonProdction" class={!isProd ? 'show' : ''}>
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
  <nav class={showMenu ? 'show' : ''} style="--dropFromHeight: {isProd ? '10' : '110'}px;" on:click={toggleMenu}>
    <ul>
      <li class="logo">
        <img on:click={goHome} class="" src="/assets/icons/transparent-logo-1.svg" alt="iKomida" />
      </li>
      <li>
        <Link class="link" to="/">Home</Link>
      </li>
      <li>
        <Link class="link" to="plans">Planos</Link>
      </li>
      <li>
        <Link class="link" to="calculator">Quanto economizaria?</Link>
      </li>
      <li>
        <Link class="link" to="about">A empresa</Link>
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
    box-shadow: 1px 2px rgba(black, 0.3);
  }
  header > #nonProdction {
    display: none;
    width: 100%;
    border: 1px solid red;
    color: black;
    background: yellow;
    padding: 10px;
    text-align: center;
    color: rgb(53, 1, 1);
  }
  header > #nonProdction.show {
    display: block;
  }
  header.background {
    background-image: linear-gradient(90deg, #000000, #350101);
  }
  header.shadow {
    box-shadow: 0 12px 10px rgb(0 0 0 / 30%);
  }
  header > nav {
    flex-shrink: 0;
    /* background-color: #202020; */
    font-size: 25px;
    color: #a80000;
    margin: 0;
    padding: 0;
    display: flex;
    max-height: 70px;
    text-transform: uppercase;
  }
  header > div.mobile {
    display: none;
  }
  header > nav > ul > li > :global(.link) {
    color: white;
    padding: 20px 20px 10px 10px;
  }
  header > nav > ul {
    display: inline-flex;
    list-style: none;
    font-size: 0;
    margin: 0;
    height: 70px;
  }
  header > nav > ul > li#menuRights {
    display: none;
  }
  header > nav > ul > li {
    cursor: pointer;
    font-size: 25px;
    margin: 0;
    padding: 0px;
    display: inline;
    height: 100%;
    width: auto;
    text-decoration: none;
    display: flex;
  }
  header > nav > ul > li > img {
    margin-right: 20px;
    object-fit: contain;
  }
  @media screen and (max-width: 820px) {
    header > div.mobile {
      display: flex;
      flex-direction: row;
      height: 70px;
      align-items: center;
    }
    header > div.mobile > div {
      display: block;
      height: 40px;
      width: 35px;
      overflow: hidden;
      margin-top: 6px;
      margin-left: 20px;
      /* background: black; */
    }
    header > div.mobile > img {
      margin: auto;
      max-height: 100%;
    }
    header > div.mobile > div > div {
      margin-top: 5px;
      background: #fff;
      display: block;
      width: 100%;
      height: 4px;
      border-radius: 2px;
    }
    header > nav {
      position: fixed;
      left: -100%;
      min-height: calc(100vh - var(--dropFromHeight));
      background: #cccccc33;
      min-width: 100%;
      transition: left 300ms;
    }
    header > nav > ul {
      display: block;
      background-color: #000000dd;
      min-width: 75%;
      min-height: calc(100vh - 70px);
      overflow: hidden;
    }
    header > nav > ul > li {
      display: block;
      width: 100%;
      height: auto;
      margin-top: 20px;
    }
    header > nav > ul > .logo {
      display: none;
    }
    header > nav.show {
      left: 0;
    }
    header > nav > ul > li#menuRights {
      display: block;
      position: absolute;
      left: 0;
      border-bottom: 0;
      bottom: 70px;
      color: white;
      font-size: 14px;
      text-align: center;
      width: 75%;
      text-transform: none;
    }
  }
</style>
