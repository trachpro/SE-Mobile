import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InfoComponent } from './info/info.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProfilePage,
    InfoComponent,
    MyPostsComponent,
    ChangePassComponent
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
export class ProfilePageModule {}
