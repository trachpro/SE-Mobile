import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CategoryService } from '../../core/api/category.service';
import { PostService } from '../../core/api/post.service';
import { ImageService } from '../../core/api/image.service';
import { LoadingService } from '../../core/util/loading.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { LoginService } from '../../core/api/login.service';
import { StorageService } from '../../core/util/storage.service';


declare let $: any;

/**
 * Generated class for the EditPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'edit-post/:id'
})
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {
  

  private dataModel: any;
  private display: Boolean = false;
  private title: String;
  private registData: any = {};
  private categoryList: Array<any> = [];
  private id: any;
  private idDiv: String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private categoryService: CategoryService,
    private postService: PostService,
    private imageService: ImageService,
    private loading: LoadingService,
    private dialog: DialogService,
    private loginService: LoginService,
    // private router: Router,
    // private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }

  async ngOnInit() {

    this.idDiv = "summernote"+ new Date().getTime();

    this.loading.show();

    await this.loginService.refreshKey().toPromise().then( data => {
      
      // this.loading.hide();

      this.display = true;
    }, error => {

      this.navCtrl.push("LoginPage");
      this.loading.hide();
    })

    if(!this.display) return;

    $('#' + this.idDiv).summernote();

    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.navParams.get('id');

    this.registData.categoryID = '1';
    this.registData.title = '';

    if(Number(this.id)) {

      this.initForEdit(this.id);
    } else {

      let data = this.storageService.get('preview' + this.id);

      console.log("preview Data: ", data);

     

      if(data) {

        this.registData = data;

        this.dataModel = this.registData.content;

        $('#' + this.idDiv).summernote('code','<p>' + this.dataModel + '</p>');
        console.log("init summernote");
      }

      this.loading.hide();
    }

    this.categoryService.list().subscribe( data => {

      this.categoryList = data;

      this.display = true;
      // this.loading.hide();
    })
  }

  initForEdit(id) {

    this.postService.getById(id).subscribe( data => {

      this.registData = data.data;
      this.dataModel = this.registData.content;

      let data1 = this.storageService.get('preview' + this.id);

      if(data1) {

        this.registData = data1;

        this.dataModel = this.registData.content;

        
      }

      $('#' + this.idDiv).summernote('code', this.dataModel );

      this.loading.hide();
    })
  }

  // ngAfterViewInit() {

  //   $('#summernote').summernote('code', this.dataModel );
  // }


  post(): Observable<any> {

    return new Observable( observer => {

      if (!this.checkValid()) {

        observer.error();
        observer.complete();

        return;
      }

      this.loading.show();

      let imgList = $('img');

      let count = 0;

      imgList.toArray().forEach(element => {

        if (element.src.indexOf('data') == 0) {

          count++;

          console.log("image: ", count);

          let params: any = {
            imageURI: element.src
          }

          this.imageService.post(params).subscribe(data => {

            element.src = data.imageUrl;
            count--;

            if (count == 0) {

              observer.next();
              observer.complete();
            }
          })
        }
      });

      if (!count || !imgList.length) {

        observer.next();
        observer.complete();
      }

    })

    
  }


  checkValid() {

    if(!this.registData.title) {

      this.dialog.showError("Empty title!");
      return false;
    }

    if(!$('#' + this.idDiv).val()) {

      this.dialog.showError("Empty content!");
      return false;
    }

    return true;
  }

  preview() {

    
    this.post().subscribe( data => {

      this.registData.content = $('#' + this.idDiv).summernote('code');

      this.storageService.set('preview' + this.id, this.registData);
      console.log("pre: ", this.storageService.get('preview'+this.id));

      this.loading.hide();

      // this.router.navigate(['main/preview/'+ this.id]);

      this.navCtrl.push('PreviewPage', {
        id: this.id
      })

      console.log("after upload image: ", this.registData.content);
    }, error => {

      this.loading.hide();
    })
  }

}
