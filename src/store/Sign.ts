import { makeAutoObservable } from 'mobx'

export class SignStore {
  signUp: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  setSignUp(value: boolean) {
    this.signUp = value
  }

  get signPhrase() {
    return `Sing ${this.signUp ? 'Up' : 'In'}`
  }
}

export const signStore = new SignStore()
