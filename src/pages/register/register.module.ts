import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    RegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterPage),
    ComponentsModule,
    FormsModule,
    CommonModule
  ],
})
export class RegisterPageModule {}
