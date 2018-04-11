import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module'

// import { MainRoutes } from './main.routes';
// import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
export class HomePageModule {}
