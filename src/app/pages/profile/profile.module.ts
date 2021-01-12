import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { HeaderComponent } from '../../header/header.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { PostListComponent } from 'src/app/post-list/post-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, HeaderComponent, ProfileComponent, PostListComponent]
})
export class ProfilePageModule {}
