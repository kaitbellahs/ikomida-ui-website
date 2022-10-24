/// <reference types="svelte" />
declare module '*.svelte' {
  export { SvelteComponentDev as default } from 'svelte/internal'
}
interface Window {
  environment: string
  version: string
}
declare module 'svelte-carousel'
