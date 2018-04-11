import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
// import { DialogService } from '../../core/dialog/dialog.service'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private fullname: String;
  private email: String;
  private username: String;
  private password: String;
  private confirmPassword: String;
  private message: String;
  constructor(
    private loginService: UserService,
    private loadingService: LoadingService,
    private navCtrl: NavController,
    // private dialog: DialogService,
    public navParams: NavParams
  ) {}

  ngOnInit() {
    
  }

  submit() {
      var userInfo = {
        name: this.fullname,
        email: this.email,
        username: this.username,
        password: this.password
      }

      this.loadingService.show();
      this.loginService.post(userInfo).subscribe( data => {
          
          this.loadingService.hide();

          this.navCtrl.pop();
      }, err => {
          this.message = err.message;
          this.loadingService.hide();
      })
  }

}