import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from '@angular/common/http';
import { WINDOW } from '@app/shared/window.token';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SessionStorageService,
    AuthService,
    { provide: WINDOW, useValue: window }
  ]
})
export class AuthModule { }
