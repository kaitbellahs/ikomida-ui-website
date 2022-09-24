import {
	initializeApp
} from "firebase/app";
import {
	getAnalytics
} from "firebase/analytics";
import App from './App.svelte';
import {
	Network,
	Stores
} from '@ikomida/shared-frontend';

const appVersion = '0.0.1'
let env: any = 'development'
try {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	env = environment ?? 'development'
	// eslint-disable-next-line no-empty
} catch (error: any) { }
const agent = "WEB-VENDOR"
const url: any = {
	production: "https://api.ikomida.com",
	development: "https://dev.api.ikomida.com",
	homologation: "https://hmlg.api.ikomida.com"
}
Stores.Cache.createInstance()
Network.createInstance(url[env], "com.ikomida", agent, "6LebYzshAAAAAIXhka3WrAjus5tDXtefR1QefVZS", appVersion);
Stores.Loading.createInstance()
Stores.Layout.createInstance()

// Initialize Firebase
const firebaseConfig: any = {
	production: {
		apiKey: "AIzaSyBOB-RGe7Y6C2MRZazVz9DJvYXU-xgdv-4",
		authDomain: "ikomida-prod.firebaseapp.com",
		projectId: "ikomida-prod",
		storageBucket: "ikomida-prod.appspot.com",
		messagingSenderId: "981415290588",
		appId: "1:981415290588:web:48034870056195115d3619",
		measurementId: "G-SR97E49HFX"
	},
	development: {
		apiKey: "AIzaSyBfeISBZ7aSIcmBV9LphNcaNtkfNMf2Sis",
		authDomain: "ikomida-dev.firebaseapp.com",
		projectId: "ikomida-dev",
		storageBucket: "ikomida-dev.appspot.com",
		messagingSenderId: "507904932701",
		appId: "1:507904932701:web:22d24360f4a5eaf71946b4",
		measurementId: "G-9RNGZF8T8L"
	}
};
const firebaseApp = initializeApp(firebaseConfig[env]);
getAnalytics(firebaseApp);
const app = new App({
	target: document.body
});

export default app;