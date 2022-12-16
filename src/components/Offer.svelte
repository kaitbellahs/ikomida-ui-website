<script lang="ts">

import { Types, Utils, Views } from '@ikomida/shared-frontend'
  import { Preferences } from '@capacitor/preferences'
  import { onMount } from 'svelte'
  import { navigate } from 'svelte-navigator'
  import { useLocation } from 'svelte-navigator'

const PROMO_TIME_PREFERENCE = 'PROMO_TIME_PREFERENCE'
const SHOW_PROMO_PREFERENCE = 'SHOW_PROMO_PREFERENCE'
const ADSCLID_PREFERENCE = 'ADSCLID_PREFERENCE'
const location = useLocation()
const today = new Date()

let promoTime: Date
let clickId: string | null = null
  let showAlert = false

  async function hideAlert() {
    await Preferences.set({
      key: SHOW_PROMO_PREFERENCE,
      value: JSON.stringify(false)
    })
    showAlert = false
  }

  onMount(async () => {
    const params = new URLSearchParams($location?.search)
    clickId = params.get('gclid')
    if (clickId) {
      Preferences.set({
        key: ADSCLID_PREFERENCE,
        value: clickId
      })
    }
    clickId = (
      await Preferences.get({
        key: ADSCLID_PREFERENCE
      })
    )?.value
    const value = (
      await Preferences.get({
        key: SHOW_PROMO_PREFERENCE
      })
    )?.value
    showAlert = JSON.parse(value === '' || !value ? 'true' : value) && !Utils.Browsers.isMobile()
    if (showAlert) {
      if (clickId) {
        let savedDate = (
          await Preferences.get({
            key: PROMO_TIME_PREFERENCE
          })
        )?.value
        if (!savedDate) {
          promoTime = new Date()
          promoTime.setDate(promoTime.getDate() + 7)
          await Preferences.set({
            key: PROMO_TIME_PREFERENCE,
            value: promoTime.toString()
          })
        } else {
          promoTime = new Date(savedDate)
        }
      }
    }
  })
</script>
{#if showAlert}
<Views.Alert
  title="Oferta imperdível"
  closeCallBack={hideAlert}
  buttons={[
    {
      name: 'Não obrigado',
      callback: hideAlert
    },
    {
      name: $location?.pathname !== '/calculator' ? 'Quero calcular meus gastos' : 'Quero conferir os planos',
      callback: () => {
        hideAlert()
        if ($location?.pathname !== '/calculator') {
          navigate('/calculator', {
            state: { from: $location.pathname },
            replace: true
          })
        } else {
          navigate('/plans', {
            state: { from: $location.pathname },
            replace: true
          })
        }
      },
      principal: true
    }
  ]}
  ><h1>Não sei se você já sacou, mas a gente quer te ajudar a ganhar mais dinheiro?</h1>
  {#if !Utils.Browsers.isMobile() || $location?.pathname === '/calculator'}
    <Views.Divider />
    <Views.Status
      >Pensando em como vamos te ajudar a tornar seu negócio mais lucrativo, desenvolvemos essa plataforma iKomida
      para lhe ajudar a ganhar mais clientes fiéis a sua marca e vender mais sem precisar se preocupar com pagar uma
      comissão absurda sobre seu faturamento, {clickId && promoTime > today
        ? 'e além dos valores mensais simbólicos, vamos lhe oferecer Até 3 meses gratuitamente para que você possa conhecer a plataforma iKomida sem compromisso'
        : 'e valores mensais simbólicos'}. E claro, se não gostar pode cancelar quando quiser sem carência ou tempo
      mínimo do contrato.</Views.Status
    >
  {/if}
  {#if $location?.pathname !== '/calculator'}
    <Views.Divider />
    <Views.Status type={Types.Status.WARNING} showIcon={false}
      >E pra te mostrar o quanto você ta perdendo sem usar a plataforma iKomida, desenvolvemos uma calculadora de
      gastos com vendas online para que você possa ver com seus próprios olhos quanto dinheiro você está perdendo.</Views.Status
    >
  {/if}
</Views.Alert>
{/if}