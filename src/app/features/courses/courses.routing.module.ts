import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { NgModule } from "@angular/core";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canLoad: [AuthorizedGuard]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoursesRoutingModule {}