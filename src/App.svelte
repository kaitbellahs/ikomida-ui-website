<script lang="ts">
  import { onMount } from 'svelte'
  import { Preferences } from '@capacitor/preferences'
  import { Router, Link, Route } from 'svelte-navigator'
  import About from './pages/About.svelte'
  import Blog from './pages/Blog.svelte'
  import BlogPost from './pages/BlogPost.svelte'
  import Checkout from './pages/Checkout.svelte'
  import Home from './pages/Home.svelte'
  import Plans from './pages/Plans.svelte'
  import Result from './pages/Result.svelte'
  import TermsOfUse from './pages/TermsOfUse.svelte'
  import PrivacyPolicy from './pages/PrivacyPolicy.svelte'
  import Calculator from './pages/Calculator.svelte'
  import Callback from './pages/callback.svelte'
  import Contact from './pages/Contact.svelte'
  import Apps from './pages/Apps.svelte'
  import Navbar from './components/Navbar.svelte'
  import Referral from './components/Referral.svelte'
  import { Views, Stores } from '@ikomida/shared-frontend'
  import { Writable } from 'svelte/store'
  import Image from '@ikomida/shared-frontend/lib/components/Image.svelte'

  const COOKIES_AGREEMENT_PREFERENCE = 'COOKIES_AGREEMENT_PREFERENCE'
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  let pageName: Writable<string | null> = Stores.Title.instance.store
  let screenW: number
  let cookiesAgreement = false
  let location = window.location.href
  const version = window.version

  $: if (location) {
    Stores.Loading.instance.start()
  }
  $: style = ['ikomida.com', 'ikomida.com.br', 'www.ikomida.com', 'www.ikomida.com.br'].includes(window.location.host)
    ? ''
    : `margin-top: ${screenW > 820 ? 44 : 65}px !important;`

  async function acceptCookiesAgreement() {
    await Preferences.set({
      key: COOKIES_AGREEMENT_PREFERENCE,
      value: JSON.stringify(true)
    })
    cookiesAgreement = true
  }

  function updateHref() {
    location = window.location.href
  }

  history.pushState = function (data: any, unused: string, url?: string | URL | null) {
    originalPushState.apply(this, [data, unused, url])
    updateHref()
  }

  history.replaceState = function (data: any, unused: string, url?: string | URL | null) {
    originalReplaceState.apply(this, [data, unused, url])
    updateHref()
  }

  function openWhatsapp() {
    window.open('http://wa.me/5511945930909', 'whatsapp')
  }

  onMount(async () => {
    const value = (
      await Preferences.get({
        key: COOKIES_AGREEMENT_PREFERENCE
      })
    )?.value
    cookiesAgreement = JSON.parse(value === '' || !value ? 'false' : value)
  })

  window.addEventListener('popstate', updateHref)
  window.addEventListener('hashchange', updateHref)

  $: title = $pageName ? `Ikomida - ${$pageName}` : 'Ikomida'
  $: {
    document.title = title
  }
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Views.LoadJS url="https://www.google.com/recaptcha/api.js?render=6LebYzshAAAAAIXhka3WrAjus5tDXtefR1QefVZS" />
<Router>
  <Referral />
  <main {style}>
    <Route path="/">
      <Home />
    </Route>
    <Route path="about" component={About} />
    <Route path="plans/*">
      <Route path="">
        <Plans />
      </Route>
      <Route path=":id/:plan/:price" component={Checkout} />
    </Route>
    <Route path="checkout" component={Checkout} />
    <Route path="result" component={Result} />
    <Route path="termsOfUse" component={TermsOfUse} />
    <Route path="privacyPolicy" component={PrivacyPolicy} />
    <Route path="callback" component={Callback} />
    <Route path="contact" component={Contact} />
    <Route path="calculator" component={Calculator} />
    <Route path="apps" component={Apps} />
    <Route path="blog/*">
      <Route path="/">
        <Blog />
      </Route>
      <Route path=":id" component={BlogPost} />
    </Route>
  </main>
  <footer class:hasCookiesAgreement={!cookiesAgreement}>
    <section id="socialNetwork">
      <div class="logo">
        <Views.Image source="/assets/icons/transparent-logo-1.svg" name="iKomida" />
      </div>
      <div>
        Um produto da Ti Alto Nivel<br />Todos os direitos reservados<br />iKomida website V{version}
      </div>
      <div class="icons">
        <Views.Image source="/assets/icons/instagram.svg" name="iKomida instagram" />
        <Views.Image source="/assets/icons/facebook.svg" name="iKomida facebook" />
      </div>
    </section>
    <section id="company">
      <h3>Tecnologia de informação de alto nivel LTDA</h3>
      <p>
        Telefone: (11) 94593-0909<br />
        E-mail: contact@tialtonivel.com.br<br /><br />
        CNPJ: 28.994.111/0001-80<br />
        <!-- Av. Cid Nelson Jordano 270, JD Salete,<br />Tabão da Serra / SP<br />CEP: 06767-360 -->
      </p>
    </section>
    <section id="menu">
      <h3>Acesso fácil</h3>
      <ul>
        <li>
          <Link class="link" to="/">Início</Link>
        </li>
        <li>
          <Link class="link" to="about">Sobre</Link>
        </li>
        <!-- <li>
          <Link class="link" to="blog">Blog</Link>
        </li> -->
        <li>
          <Link class="link" to="plans">Preços</Link>
        </li>
        <li>
          <Link class="link" to="contact">Contato</Link>
        </li>
        <li>
          <Link class="link" to="calculator">Quanto economizaria?</Link>
        </li>
        <li>
          <Link class="link" to="termsOfUse">Termos</Link>
        </li>
        <li>
          <Link class="link" to="privacyPolicy">Privacidade</Link>
        </li>
        <li>
          <Link class="link" to="apps">Download</Link>
        </li>
      </ul>
    </section>
  </footer>
  {#if !cookiesAgreement}
    <div class="cookiesAgreement">
      <div class="text">
        Estamos usando cookies e outras tecnologias nesse site para melhorar sua experiência.<br />
        Ao clicar em qualquer link nesta página, você está nos dando seu consenso em nossa <Link
          class="link"
          to="privacyPolicy">política de privacidade</Link
        >.
      </div>
      <div class="action">
        <Views.Button on:click={acceptCookiesAgreement}>Eu concordo</Views.Button>
      </div>
    </div>
  {/if}
  <Navbar />
</Router>
<Views.Loading />
<Views.MessageAlert />
<button class="whatsapp" on:click={openWhatsapp}>
  <Views.Image source="assets/icons/whatsapp.png" name="iKomida whatsapp" />
  <span>Dúvidas entre<br />em contato</span>
</button>
<svelte:window bind:innerWidth={screenW} />

<style>
  button.whatsapp {
    place-items: center;
    background-color: rgb(255 255 255 / 50%);
    border: 0;
    position: fixed;
    bottom: 30px;
    right: 20px;
    display: flex;
    flex-direction: column;
  }
  button.whatsapp > :global(img) {
    width: 50px;
  }
  button.whatsapp > span {
    text-shadow: 1px 1px #000;
  }
  .cookiesAgreement {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    background: #000;
    color: #fff;
    padding: 20px;
  }
  .cookiesAgreement > .text {
    flex: 1 75%;
  }
  .cookiesAgreement > .action {
    flex: 1 25%;
  }
  .cookiesAgreement > .text > :global(.link) {
    color: white;
    text-decoration: underline;
  }
  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1 0 auto;
    min-height: 300px;
    padding: 0;
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    flex-flow: row;
    flex-direction: row;
    align-items: center;
    background-color: #202020;
    color: #fff;
    padding: 10px 40px;
  }
  footer.hasCookiesAgreement {
    padding-bottom: 70px;
  }
  footer > section {
    flex: 1;
    padding: 10px;
    border-radius: 4px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  footer > section ul {
    list-style: none;
    padding: 0;
    align-self: center;
  }
  footer > section#socialNetwork {
    text-align: center;
    width: 30%;
    flex-basis: 29%;
  }
  footer > section#company {
    text-align: center;
    width: 50%;
    flex-basis: 54%;
  }
  footer > section#menu {
    text-align: center;
    width: 20%;
    flex-basis: 14%;
  }
  footer > section#socialNetwork {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
  }
  footer > section#socialNetwork > .logo {
    color: white;
    object-fit: contain;
    max-height: 70px;
    width: inherit;
  }
  footer > section#socialNetwork > div.icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  footer > section#socialNetwork > div.icons > :global(img) {
    width: fit-content;
    height: 24px;
    filter: invert(100%) sepia(100%) saturate(100%) hue-rotate(333deg) brightness(104%) contrast(100%);
    margin: 10px;
  }
  footer > section ul > li {
    margin: 0;
  }
  footer > section ul > li > :global(.link) {
    color: white;
  }
  @media screen and (max-width: 820px) {
    .cookiesAgreement {
      flex-direction: column;
    }
    .cookiesAgreement .action {
      margin-top: 20px;
    }
    footer {
      flex-direction: row;
    }
    footer.hasCookiesAgreement {
      padding-bottom: 220px;
    }
    footer > section:not(:last-child) {
      border-bottom: 1px dashed rgb(0 0 0 / 50%);
    }
    footer > section {
      width: 100%;
      flex-basis: 100%;
    }
    footer > section ul {
      display: flex;
    }
    footer > section ul > li {
      padding-left: 20px;
    }
    footer > section#socialNetwork,
    footer > section#company,
    footer > section#menu {
      text-align: center;
      width: 100%;
      flex-basis: 100%;
    }
    footer > section#menu > ul {
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
    }
    footer > section#menu > ul > li {
      flex: 1;
      width: 50%;
      flex-basis: 48%;
    }
  }
</style>
