import { provideRouter, RouterModule, Routes, withDebugTracing } from "@angular/router";
import { LoginFormComponent } from "./login-form.component";
import { NgModule } from "@angular/core";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthModule } from "@app/auth/auth.module";

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes), AuthModule],
    exports: [RouterModule],
})
export class LoginPageRoutingModule {}