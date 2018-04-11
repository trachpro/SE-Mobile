import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from 'Ionic-angular';

import { MatchingValidatorDirective } from './matching-validator.directive';
import { BrefPostComponent } from '../pages/home/bref-post/bref-post.component';


@NgModule({
	declarations: [
		MenuComponent,
		MatchingValidatorDirective,
		BrefPostComponent
    ],
	imports: [
		FormsModule,
		CommonModule,
		IonicModule.forRoot(BrefPostComponent)
	],
	exports: [
		MenuComponent,
		MatchingValidatorDirective,
		BrefPostComponent
    ]
})
export class ComponentsModule {}
