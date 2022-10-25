import pkg from '../package.json' assert { type: 'json' }
window.environment = 'ENVIRONMENT'
window.version = pkg.version
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import App from './App.svelte'
import { Network, Stores } from '@ikomida/shared-frontend'
const appVersion = pkg.version
const agent = 'SITE-VENDOR'
const url: any = {
  production: 'https://api.ikomida.com',
  development: 'https://dev.api.ikomida.com',
  homologation: 'https://hmlg.api.ikomida.com'
}
Stores.Cache.createInstance()
Stores.Loading.createInstance()
Stores.Layout.createInstance()
Stores.Title.createInstance()
Network.createInstance(
  url[window.environment],
  'com.ikomida',
  agent,
  '6LebYzshAAAAAIXhka3WrAjus5tDXtefR1QefVZS',
  appVersion
)

// Initialize Firebase
const firebaseConfig: any = {
  production: {
    apiKey: 'AIzaSyBOB-RGe7Y6C2MRZazVz9DJvYXU-xgdv-4',
    authDomain: 'ikomida-prod.firebaseapp.com',
    projectId: 'ikomida-prod',
    storageBucket: 'ikomida-prod.appspot.com',
    messagingSenderId: '981415290588',
    appId: '1:981415290588:web:1d8ab499333a80a35d3619',
    measurementId: 'G-38ZPLEES90'
  },
  homologation: {
    apiKey: 'AIzaSyBfhHXxMGYgNlTETLBRJwzR22JAGdVO-a8',
    authDomain: 'ikomida-hmlg.firebaseapp.com',
    projectId: 'ikomida-hmlg',
    storageBucket: 'ikomida-hmlg.appspot.com',
    messagingSenderId: '855187514148',
    appId: '1:855187514148:web:ce1f669b8f1a23e4bec9b1',
    measurementId: 'G-BCNP23K5P5'
  },
  development: {
    apiKey: 'AIzaSyBfeISBZ7aSIcmBV9LphNcaNtkfNMf2Sis',
    authDomain: 'ikomida-dev.firebaseapp.com',
    projectId: 'ikomida-dev',
    storageBucket: 'ikomida-dev.appspot.com',
    messagingSenderId: '507904932701',
    appId: '1:507904932701:web:22d24360f4a5eaf71946b4',
    measurementId: 'G-9RNGZF8T8L'
  }
}
const firebaseApp = initializeApp(firebaseConfig[window.environment])
getAnalytics(firebaseApp)
const app = new App({
  target: document.body
})

export default app
