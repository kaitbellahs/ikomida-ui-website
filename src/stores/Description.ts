import { Stores } from '@ikomida/shared-frontend'

export default class Description extends Stores.BaseStore<string> {
    createStore() {
        return super.createStore('')
    }

    set(payload: string) {
        const store = this.store
        return store?.set(payload)
    }
}