import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import 'rxjs/add/operator/filter';

import { LoadingService } from '../../core/util/loading.service';
import { PostService } from '../../core/api/post.service';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'home/:page'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @Input() id: any;
  private postList: Array<any> = [];
  private page: number;

  constructor(
    private loadingService: LoadingService,
    private postService: PostService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ngOnInit() {

    this.page = this.navParams.get('page');

    console.log("this.page: ", this.page);

    this.loadingService.show();

    if(!Number(this.page)) this.page = 1;

    this.getPostList();
  }

  getPostList() {

    this.postService.list(this.page).subscribe( data => {

      this.postList = data;

      console.log(" data: ", data);
      this.loadingService.hide();
    }, error => {

      this.loadingService.hide();
    })
  }

  next() {

    this.navCtrl.push('HomePage', {

      page: this.page + 1
    })
  }

  previos() {

    this.navCtrl.pop();
  }
}
