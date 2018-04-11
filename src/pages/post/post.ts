import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';

import { FormatService } from '../../core/util/format.service';
import { PostService } from '../../core/api/post.service'
import { LoadingService } from '../../core/util/loading.service';

declare let $: any;

/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'post/:id'
})
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  // @Input() id: any;
  private postDetail: any = {};
  private id: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private postService: PostService,
    private formatService: FormatService,
    private loading: LoadingService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  ngOnInit() {

    this.loading.show();

    this.id = this.navParams.get('id');

    console.log("id: ", this.id);

    if(!this.id) this.id = 1;

    this.postService.getById(this.id).subscribe( data => {

      console.log("post: ",this.id, data);
      this.loading.hide();

      this.postDetail = data.data;
      
      setTimeout( () => {
        $("#display").html(this.postDetail.content);
      }, 50)
    }, error => {

      this.loading.hide();
    })
  }
}
