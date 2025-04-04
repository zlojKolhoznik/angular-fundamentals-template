import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./login-form.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginPageRoutingModule {}