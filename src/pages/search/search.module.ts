import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from '../../components/components.module'

// import { MainRoutes } from './main.routes';
// import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    SearchPage
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    CommonModule,
    FormsModule,
    ComponentsModule
  ],
})
export class SearchPageModule {}
