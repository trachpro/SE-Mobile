import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NavController } from 'Ionic-angular';
import { StorageService } from '../core/util/storage.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "HomePage";
  @ViewChild('myNav') nav: NavController;

  private isLog: Boolean = false;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storageService: StorageService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngAfterViewInit() {

    this.nav.viewDidEnter.subscribe( data => {
      
      this.isLog = this.storageService.get('token')? true: false;
    })
  }

  goto(page) {

    if(page == 'LoginPage') {

      this.storageService.set('token', null);
    }

    // this.nav.popToRoot();
    this.nav.push(page);
  }
}