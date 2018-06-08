import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { DialogService } from './dialog.service';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';
import { ConfirmComponent } from './confirm/confirm';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [
    ErrorComponent, 
    SuccessComponent,
    ConfirmComponent
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    ErrorComponent, 
    SuccessComponent,
    ConfirmComponent
  ]
})
export class DialogModule { }
