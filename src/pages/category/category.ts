import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/filter';

import { LoadingService } from '../../core/util/loading.service';
import { PostService } from '../../core/api/post.service';
import { CategoryService } from '../../core/api/category.service';
import { encodeUriQuery } from '@angular/router/src/url_tree';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  private postList: Array<any> = [];
  private page: any;
  private numberResults: Number;
  private categoryID: Number;
  private category: String;

  constructor(
    private loadingService: LoadingService,
    private postService: PostService,
    private categoryService: CategoryService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  async ngOnInit() {

    this.loadingService.show();

    this.categoryID = this.navParams.data.topic
    console.log("category id: ", this.navParams.data);

    this.page = this.navParams.data.page ? this.navParams.data.page: 1
    this.getPostList();
  }

  getPostList() {
    var param = { 
      page: this.page,
      categoryID: this.categoryID,
    }

    this.postService.getByCategory(param).subscribe( data => {
      this.postList = data;
      this.numberResults = this.postList.length;
      this.loadingService.hide();
    }, error => {
      this.loadingService.hide();
    })
  }

  loadNextPage() {
    this.navCtrl.push('CategoryPage', {

      page: this.page + 1
    })
  }
  loadPreviousPage() {

    this.navCtrl.pop();
  }

}
