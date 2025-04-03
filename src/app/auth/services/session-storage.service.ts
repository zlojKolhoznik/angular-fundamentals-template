import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@app/shared/window.token';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private window: Window) {

  }

  setToken(token: string){
    window.sessionStorage.setItem(TOKEN, token);
    console.log(window.sessionStorage);
  }

  getToken(){
    return window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    window.sessionStorage.removeItem(TOKEN);
  }
}
