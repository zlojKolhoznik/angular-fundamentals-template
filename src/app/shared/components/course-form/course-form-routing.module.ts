import { RouterModule, Routes } from "@angular/router";
import { CourseFormComponent } from "./course-form.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: CourseFormComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CourseFormRoutingModule { }