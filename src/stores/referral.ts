import {
	writable
} from 'svelte/store';

function createReferral() {
	const {
		subscribe,
		set
	} = writable('');

	return {
		subscribe,
		set: (code: string) => set(code)
	};
}

export default createReferral();