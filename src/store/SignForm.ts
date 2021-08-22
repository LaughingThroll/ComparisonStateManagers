import { ChangeEvent } from 'react'
import { action, computed, makeObservable, observable } from 'mobx'
import { signStore } from './Sign'

interface Form {
  [key: string]: string
  login: string
  email: string
  password: string
}

export class SignForm {
  userForm: Form = {
    login: '',
    email: '',
    password: '',
  }

  constructor() {
    makeObservable(this, {
      userForm: observable,
      isDisabled: computed,
      onChange: action,
      resetValue: action,
    })
  }

  get isDisabled() {
    return (signStore.signUp || !this.userForm.email) && !this.userForm.password && !this.userForm.login
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.userForm[e.target.name] = e.target.value
  }

  resetValue = () => {
    Object.keys(this.userForm).forEach((key) => (this.userForm[key] = ''))
  }
}

export const signForm = new SignForm()
