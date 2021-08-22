import { action, makeObservable } from 'mobx'
import { authorizationStore } from './Authorization'
import { QuotesStore } from './Quotes'

class App extends QuotesStore {
  constructor() {
    super()
    makeObservable(this, {
      DESTROY_THIS_APP: action,
    })
  }

  DESTROY_THIS_APP = () => {
    this.quotes = []
    authorizationStore.closeSession()
    window.close()
  }
}

export const appStore = new App()
