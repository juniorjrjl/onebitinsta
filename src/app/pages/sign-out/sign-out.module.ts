import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignOutPageRoutingModule } from './sign-out-routing.module';

import { SignOutPage } from './sign-out.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignOutPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SignOutPage]
})
export class SignOutPageModule {}
