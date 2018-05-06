import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router  } from '@angular/router';
import 'rxjs/add/operator/filter';

import { LoadingService } from '../../core/util/loading.service';
import { PostService } from '../../core/api/post.service';
import { encodeUriQuery } from '@angular/router/src/url_tree';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private postList: Array<any> = [];
  private page: Number;
  private query: string;
  private numberResults: Number;

  constructor(
    private loadingService: LoadingService,
    private postService: PostService,
    // private route: ActivatedRoute,
    // private router: Router,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ngOnInit() {

    this.loadingService.show();

    // this.route.queryParams
    //   .subscribe(params => {
    //     this.page = params.page? params.page: 1;
    //     this.query = params.query ? params.query : "";
    //     this.getPostList();
    //     this.query = this.query.trim();
    //     if(!this.query.length) this.router.navigate(["/"]);
    //   });

    console.log("this.navParams.data: ", this.navParams.data);

    let params = this.navParams.data;
    this.page = params.page? params.page: 1;
        this.query = params.query ? params.query : "";
        this.getPostList();
        this.query = this.query.trim();
  }

  getPostList() {
    
    var param = {
      string: this.escape(this.query), 
      page: this.page,
    }
    this.postService.search(param).subscribe( data => {

      this.postList = data;
      this.numberResults = this.postList.length;
      this.loadingService.hide();
    }, error => {

      this.loadingService.hide();
    })
  }

  escape(input) {
    var str = encodeURIComponent(input);
    return str
            .replace("%20"," ");
    
  }

}
