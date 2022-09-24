<script lang="ts">
  import { useLocation } from 'svelte-navigator';
  import Referral from '../stores/referral';
  const location = useLocation();
  $: if (location) {
    const params = new URLSearchParams($location?.search);
    const code = params.get('referralCode');
    if (code) {
      Referral.set(code);
    }
  }
</script>
