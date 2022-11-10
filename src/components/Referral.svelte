<script lang="ts">
  import { Preferences } from '@capacitor/preferences'
  import { useLocation } from 'svelte-navigator'
  import Referral from '../stores/referral'
  const location = useLocation()
  const ADSCLID_PREFERENCE = 'ADSCLID_PREFERENCE'
  const PROMO_TIME_PREFERENCE = 'PROMO_TIME_PREFERENCE'

  $: if (location) {
    const params = new URLSearchParams($location?.search)
    const code = params.get('referralCode')
    if (code) {
      Referral.set(code)
    }
    const clickId =
      params.get('gclid') ??
      params.get('fbclid') ??
      params.get('dclid') ??
      params.get('gclsrc') ??
      params.get('wbraid') ??
      params.get('msclkid') ??
      params.get('gbraid')
    if (clickId) {
      Preferences.set({
        key: ADSCLID_PREFERENCE,
        value: clickId
      })
      Preferences.get({
        key: PROMO_TIME_PREFERENCE
      }).then(savedDate => {
        if (!savedDate.value) {
          const promoTime = new Date()
          promoTime.setDate(promoTime.getDate() + 7)
          Preferences.set({
            key: PROMO_TIME_PREFERENCE,
            value: promoTime.toString()
          })
        }
      })
    }
  }
</script>
