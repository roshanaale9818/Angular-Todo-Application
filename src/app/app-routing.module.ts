import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './config/guard/auth.guard';

const routes: Routes = [
  {
    path: 'todo',
    loadChildren: () => import('./modules/todo/todo.module').then(m => m.TodoModule)
  },
  {
    path:"login",
    loadChildren:()=>import('./modules/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:"dashboard",
    canActivate:[AuthGuard],
    loadChildren:()=>import('./modules/dashboard/dashboard.module').then(m=>m.DashboardModule),
    data:{
      role:"ROLE_ADMIN"
    }
  },
  {
    path:'',
    redirectTo:'todo',
    pathMatch:'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
