import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { LoginService } from '../../core/api/login.service';

import { LoadingService } from '../../core/util/loading.service';
import { StorageService } from '../../core/util/storage.service';
import { DialogService } from '../../core/dialog/dialog.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navParams: NavParams,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private navCtrl: NavController,
    private dialog: DialogService
  ) {
  }

  private username: String;
  private password: String;
  private isRemember: Boolean;

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  ngOnInit() {

    this.isRemember = this.storageService.get('isRemember');

    if(this.isRemember) {

      this.username = this.storageService.get('username');
      this.password = this.storageService.get('password');
    }
  }

  submit() {

    this.save();

    this.loadingService.show();
    this.loginService.login({username: this.username,password: this.password}).subscribe( data => {

      console.log("data: ", data);
      this.storageService.set('token',data.token);
      this.storageService.set('id', data.ID)
      
      this.navCtrl.push('HomePage');
      
      this.loadingService.hide();
    }, error => {

      this.dialog.showError("Wrong password!");
      this.loadingService.hide();
    })
  }

  save() {

    if(this.isRemember) {

      this.storageService.set("isRemember", true);
      this.storageService.set("username", this.username);
      this.storageService.set("password", this.password);
    } else {

      this.storageService.set("isRemember", false);
      this.storageService.set("username", '');
      this.storageService.set("password", '');
    }
  }

  gotoRegist() {

    this.navCtrl.push('RegisterPage');
  }
}
