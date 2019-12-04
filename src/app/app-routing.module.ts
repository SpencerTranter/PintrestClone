import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import { LoginActivate } from './common/guards/login-activate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginActivate] }
  // {
  //   path: ':recipeId',
  //   loadChildren: './recipes/recipe-detail/recipe-detail.module#RecipeDetailPageModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
