import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../core/util/storage.service';

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  text: string;

  constructor(
    private navCtr: NavController,
    private storageService: StorageService
  ) {
  }

  public goto(page) {

    if(page == 'LoginComponent'){

      this.storageService.set('token', null);
    }

    this.navCtr.push(page);
  }

}
