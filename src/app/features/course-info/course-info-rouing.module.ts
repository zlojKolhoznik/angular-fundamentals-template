import { RouterModule, Routes } from "@angular/router";
import { CourseInfoComponent } from "./course-info.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: CourseInfoComponent,
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CourseInfoRoutingModule { }