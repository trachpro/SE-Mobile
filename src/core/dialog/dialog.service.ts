import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';
import { ConfirmComponent } from './confirm/confirm';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private alertCtrl: AlertController
  ) { }

  showSuccess(data?): Observable<any> {

    if(!data) data = '';

    let success = this.alertCtrl.create({
      message: `
       <div class="panel" style="width: 280px">
        <div class="panel-top" >
          <i class="material-icons">check_circle</i>
        </div>
        <div class="panel-body">
          <div class="noti noti-header">Awesome!</div>
        </div>
      </div> `,
      cssClass: 'custom-success-class',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    })

    // return this.dialog.open(SuccessComponent, { data: data}).afterClosed();
    return Observable.fromPromise(success.present())
  }

  showError(data?): Observable<any> {

    if(!data) data = 'Change a few things up and try submitting again';
    
    let error = this.alertCtrl.create({
      message: `
       <div class="panel" style="width: 280px">
        <div class="panel-top" >
          <i class="material-icons" style="color: white">cancel</i>
        </div>
        <div class="panel-body">
          <div><strong>Oh Snap</strong></div>
          <div> ` + data + `</div>
        </div>
      </div>`,
      cssClass: 'custom-success-class',
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    })

    return Observable.fromPromise(error.present())
  }

  showConfirm(param: ConfirmData): Observable<any> {

    return new Observable(observer => {

      let alert = this.alertCtrl.create({
        title: param.title,
        message: param.content,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {

              observer.next(false);
              observer.complete();
            }
          },
          {
            text: 'yes',
            handler: () => {

              observer.next(true);
              observer.complete();
            }
          }
        ]
      });

      alert.present();

    })
  }
}

class ConfirmData {

  title: string;
  content: string;
}