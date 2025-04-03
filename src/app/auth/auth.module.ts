import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WINDOW } from '@app/shared/window.token';
import { AuthorizedGuard } from './guards/authorized.guard';
import { NotAuthorizedGuard } from './guards/not-authorized.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SessionStorageService,
    AuthorizedGuard,
    NotAuthorizedGuard,
    AuthService,
    HttpClient,
    { provide: WINDOW, useValue: window }
  ]
})
export class AuthModule { }
