import {inject, Inject, Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  @Inject(Window) private window: Window;
  constructor() {
    this.window = inject(Window);
  }

  setToken(token: string){
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
