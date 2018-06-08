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
  private comments: any;
  private url: string;

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
      

      this.postDetail = data.data;
      
      // $("#display").html(this.postDetail.content);
      this.comments = this.postDetail.comments;
      this.loadContent();
      this.loading.hide();
    }, error => {

      this.loading.hide();
    })
  }

  loadContent() {
    $("#display").html(this.postDetail.content);
    $("img").css("max-width","100%");
    $("img").css("height","auto");
    $("iframe").css("max-width","100%");
    $("iframe").css("height","auto");
  }

  share(baseUrl) {
    window.open(baseUrl + encodeURIComponent(this.url) + "&text="+ this.postDetail.title); 
    return false;
  }
}
