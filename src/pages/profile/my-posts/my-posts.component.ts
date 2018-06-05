import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../../core/api/post.service';
import { LoadingService } from '../../../core/util/loading.service';
import { DialogService } from '../../../core/dialog/dialog.service';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html'
})
export class MyPostsComponent implements OnInit {

  private postList: Array<any> = [];
  private page: number = 1;
  @Input() user: any;
  @Input() isOwner: any;

  private params: any = {};

  constructor(
    private loadingService: LoadingService,
    private postService: PostService,
    private dialogService: DialogService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.postList = this.user.posts;

    let tem = JSON.parse(JSON.stringify(this.user));

    delete tem.posts;

    this.postList.forEach( element => {

      element.author = tem;
    })
    
    console.log("post: ", this.postList);
  }

  delete(post) {

    console.log("delete: ", post);

    this.loadingService.show();

    this.postService.delete(post.ID).subscribe( data => {

      this.dialogService.showSuccess("delete successfull!");
      this.postList.splice(this.postList.indexOf(post),1);
      this.loadingService.hide();
    }, error => {

      console.log("failed!");
      this.loadingService.hide();
      this.dialogService.showError("failed to delete this post");
    })
    
  }

  logDrag(ev) {
    if (!this.isOwner) {
      ev.close();
    }
  }

  edit(post) {

    this.navCtrl.push('EditPostPage', {
      id: post.ID
    })
  }
}
