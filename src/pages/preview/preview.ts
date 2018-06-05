import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

import { FormatService } from '../../core/util/format.service';
import { PostService } from '../../core/api/post.service'
import { LoadingService } from '../../core/util/loading.service';
import { StorageService } from '../../core/util/storage.service';
import { DialogService } from '../../core/dialog/dialog.service';

declare let $: any;

/**
 * Generated class for the PreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'preview/:id'
})
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

  private postDetail: any = {};
  private id: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private postService: PostService,
    private formatService: FormatService,
    private loading: LoadingService,
    private storageService: StorageService,
    private dialog: DialogService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreviewPage');
  }

  ngOnInit() {

    this.id = this.navParams.get('id');

    this.postDetail = this.storageService.get('preview' + this.id);

    if(this.postDetail) $('#display').html(this.postDetail.content);

    console.log("preview: ", 'preview'+this.id);

    $(".share-btn").click((e) => {
      e.preventDefault();
      return false;
    })
  }

  post() {

    this.loading.show();
    
    if (this.postDetail && this.postDetail.ID) {

      this.postService.edit(this.postDetail).subscribe(data => {

        this.loading.hide();

        console.log("regist post: ", data);
        this.success();
      }, error => {

        this.loading.hide();
        this.dialog.showError("Something goes wrong! Try again!");
      })

      return;
    }

    this.postService.post(this.postDetail).subscribe(data => {

      this.loading.hide();

      this.postDetail = data.data;
      console.log("regist post: ", data);

      this.success();
    }, error => {

      this.loading.hide();
      this.dialog.showError("Something goes wrong! Try again!");
    })
  }

  success() {

    console.log("preview: ", this.postDetail);
    this.dialog.showSuccess().subscribe( data => {

      this.storageService.set('preview' + this.id, null);

      this.navCtrl.push('PostPage', {
        id: this.postDetail.ID
      })
    })
  }

  gotoTopic() {

    this.navCtrl.push('CategoryPage', {topic: this.postDetail.category.category});
  }

}
