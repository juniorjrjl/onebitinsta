import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'signIn',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'signUp',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'other-profile',
    loadChildren: () => import('./pages/other-profile/other-profile.module').then( m => m.OtherProfilePageModule)
  },
  {
    path: 'edit-profile/:id',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
