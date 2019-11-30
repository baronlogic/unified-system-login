import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ShocklogicRoutingModule } from './shocklogic-routing.module';
import { ShocklogicComponent } from './shocklogic.component';
import { SystemsComponent } from './systems/systems.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [ ShocklogicComponent, SystemsComponent, ProjectsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShocklogicRoutingModule
  ]
})
export class ShocklogicModule { }
