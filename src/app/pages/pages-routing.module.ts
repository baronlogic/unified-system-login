import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemsComponent } from './systems/systems.component';

const routes: Routes = [
  { path: "", redirectTo: "systems", pathMatch: "full" },
  { path: "systems", component: SystemsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
