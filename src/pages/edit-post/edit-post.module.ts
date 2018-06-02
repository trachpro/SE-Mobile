import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPostPage } from './edit-post';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module'


@NgModule({
  declarations: [
    EditPostPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPostPage),
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
export class EditPostPageModule {}
