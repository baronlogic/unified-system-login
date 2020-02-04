import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './shared/guards/login.guard';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'main', loadChildren: './main/main.module#MainModule' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivate: [LoginGuard] },
  { path: 'shocklogic', loadChildren: './shocklogic/shocklogic.module#ShocklogicModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
