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
  import Features from './pages/Features.svelte'
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
  import Description from './stores/Description'
  import MetaPixel from './components/MetaPixel.svelte'

  const COOKIES_AGREEMENT_PREFERENCE = 'COOKIES_AGREEMENT_PREFERENCE'
  const originalPushState = history.pushState
  const originalReplaceState = history.replaceState

  let pageName: Writable<string | undefined> = Stores.Title.instance.store
  let pageDescription: Writable<string | undefined> = Description.instance.store
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
  $: description = $pageDescription
    ? $pageDescription
    : 'A plataforma mais completa (garçom digital, delivery e retirada) que vai te ajudar a reduzir até 95% das taxas que você está pagando para os marketplaces.'
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
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
      <Route path=":id/:plan/:price/:dueDateAfterXDays" component={Checkout} />
    </Route>
    <Route path="checkout" component={Checkout} />
    <Route path="features" component={Features} />
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
  <MetaPixel />
  <footer class:hasCookiesAgreement={!cookiesAgreement}>
    <section id="socialNetwork">
      <div class="logo">
        <Views.Image source="/assets/icons/transparent-logo-1.svg" name="iKomida" />
      </div>
      <div>
        Um produto da <a href="https://tialtonivel.com.br">Ti Alto Nivel</a><br />Todos os direitos reservados<br
        />iKomida website V{version}
      </div>
      <div class="icons">
        <a target="_blank" href="https://www.instagram.com/ikomida"
          ><Views.Image source="/assets/icons/instagram.svg" name="iKomida instagram" /></a
        >
        <a target="_blank" href="https://facebook.com/ikomida"
          ><Views.Image source="/assets/icons/facebook.svg" name="iKomida facebook" /></a
        >
        <a target="_blank" href="https://www.youtube.com/@ikomida"
          ><Views.Image source="/assets/icons/youtube.svg" name="iKomida youtube" /></a
        >
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
          <Link class="link" to="features">Funcionalidades</Link>
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
    bottom: 32pt;
    right: 16pt;
    display: flex;
    flex-direction: column;
  }
  button.whatsapp > :global(img) {
    width: 48pt;
  }
  button.whatsapp > span {
    text-shadow: 1pt 1pt #000;
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
    padding: 16pt;
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
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1 0 auto;
    min-height: 304pt;
    padding: 0;
  }
  p {
    text-indent: 1em;
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
    padding: 16pt 32pt;
  }
  footer.hasCookiesAgreement {
    padding-bottom: 72pt;
  }
  footer > section {
    flex: 1;
    padding: 16pt;
    border-radius: 4pt;
    margin: 0;
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
    flex: 1 30%;
    width: 30%;
    flex-basis: 29%;
  }
  footer > section#company {
    text-align: center;
    flex: 1 45%;
    width: 45%;
    flex-basis: 45%;
  }
  footer > section#menu {
    text-align: center;
    flex: 1 25%;
    width: 25%;
    flex-basis: 25%;
  }
  footer > section#socialNetwork {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
  }
  footer > section#socialNetwork > .logo,
  footer > section#socialNetwork > div > a {
    color: white;
    object-fit: contain;
    max-height: 72pt;
    width: inherit;
  }
  footer > section#socialNetwork > div.icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  footer > section#socialNetwork > div.icons > a:nth-child(1) {
    height: 39pt;
    width: 39pt;
    margin: 9pt;
    /* width: fit-content; */
  }
  footer > section#socialNetwork > div.icons > a:nth-child(2) {
    height: 43pt;
    margin: 8pt;
    /* width: fit-content; */
  }
  footer > section#socialNetwork > div.icons > a:nth-child(3) {
    width: 58pt;
    margin: 0;
    /* width: fit-content; */
  }
  footer > section#socialNetwork > div.icons > a > :global(img) {
    filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(333deg) brightness(55%) contrast(55%);
    width: 100%;
    height: 100%;
  }
  footer > section ul > li {
    margin: 0;
  }
  footer > section ul > li > :global(.link) {
    color: white;
  }
  @media screen and (max-width: 816pt) {
    .cookiesAgreement {
      flex-direction: column;
    }
    .cookiesAgreement .action {
      margin-top: 16pt;
    }
    footer {
      flex-direction: row;
    }
    footer.hasCookiesAgreement {
      padding-bottom: 216pt;
    }
    footer > section:not(:last-child) {
      border-bottom: 1pt dashed rgb(0 0 0 / 50%);
    }
    footer > section {
      width: 100%;
      flex-basis: 100%;
    }
    footer > section ul {
      display: flex;
    }
    footer > section ul > li {
      padding-left: 16pt;
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
