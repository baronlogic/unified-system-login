import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShocklogicComponent } from './shocklogic.component';
import { SystemsComponent } from './systems/systems.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  { 
    path: "",
    component: ShocklogicComponent,
    children: [
      { path: '', redirectTo: 'systems', pathMatch: 'full' },
      { path: "systems", component: SystemsComponent },
      //{ path: "projects", component: ProjectsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShocklogicRoutingModule { }
