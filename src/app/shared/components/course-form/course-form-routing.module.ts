import { RouterModule, Routes } from "@angular/router";
import { CourseFormComponent } from "./course-form.component";
import { NgModule } from "@angular/core";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { AdminGuard } from "@app/user/guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: CourseFormComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseFormRoutingModule { }