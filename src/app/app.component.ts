import { Component,ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NavController } from 'Ionic-angular';
import { StorageService } from '../core/util/storage.service';
import { timer } from 'rxjs/observable/timer';

declare let $: any;



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  @ViewChild('myNav') nav: NavController;

  private isLog: Boolean = false;
  private searchContent: String;

  showSplash = true;

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

      timer(3000).subscribe( () => {

        this.showSplash = false;

        this.rootPage = "HomePage"
      })
    });
  }

  ngAfterViewInit() {

    $(window).click( () => {
      this.searchContent = "";
      $("#navbarResponsive").removeClass("show");
    })

    $('#search-button').click( (e) => {
      e.stopPropagation();
    })

    $('#navbarResponsive').click( (e) => {
      e.stopPropagation();
    })

    this.nav.viewDidEnter.subscribe( data => {
      
      this.isLog = this.storageService.get('token')? true: false;
    })
  }

  goto(page) {

    if(page == 'LoginPage') {

      this.storageService.set('token', null);
    }

    // this.nav.popToRoot();
    $("#navbarResponsive").removeClass("show");
    this.nav.push(page);
  }

  search() {
    if(this.searchContent.length) {
      // this.router.navigate(["/main/search"], {queryParams: {query: this.searchContent} });
      this.nav.push('SearchPage',{query: this.searchContent});
      this.searchContent = "";
    }
    
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) { // press enter to submit
      this.search();
    }
    if(event.keyCode == 27) this.searchContent=""; // press esc to exit edit mode
  }
}