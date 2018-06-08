import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from 'Ionic-angular';

import { MatchingValidatorDirective } from './matching-validator.directive';
import { BrefPostComponent } from '../pages/home/bref-post/bref-post.component';
// import { ConfirmComponent } from './../core/dialog/confirm/confirm';
// import { CommentComponent } from './../pages/post/comment/comment';
// import { CommentDetailComponent } from './../pages/post/comment/comment-detail/comment-detail';


@NgModule({
	declarations: [
		MenuComponent,
		MatchingValidatorDirective,
		BrefPostComponent,
    // ConfirmComponent,
    // CommentComponent,
    // CommentDetailComponent
    ],
	imports: [
		FormsModule,
		CommonModule,
		IonicModule.forRoot(BrefPostComponent)
	],
	exports: [
		MenuComponent,
		MatchingValidatorDirective,
		BrefPostComponent,
    // ConfirmComponent,
    // CommentComponent,
    // CommentDetailComponent
    ]
})
export class ComponentsModule {}
