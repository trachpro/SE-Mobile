import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../../core/util/storage.service';
import { FormatService } from '../../../core/util/format.service';
import { CommentService } from '../../../core/api/comment.service';
import { DialogService } from '../../../core/dialog/dialog.service';
import { LoadingService } from '../../../core/util/loading.service';

declare var $: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.html'
})
export class CommentComponent implements OnInit {
  
  @Input() postDetail: any;
  @Input() comments: any [];

  private content: String; // content of new comment

  private user: any;
  private isLogin: Boolean = false; 
  private selectedComment: any; // the comment to be deleted
  
  constructor(
    private storageService: StorageService,
    private formatService: FormatService,
    private commentService: CommentService,
    private dialogService: DialogService,
    private loadingService: LoadingService
  ) { 
    this.isLogin = this.storageService.get("token") ? true : false;
  }

  ngOnInit() {
        
  }

  submit() {

    if (!this.content) return;

    var newComment = {
      content: this.content,
      postID: this.postDetail.ID,
    }
    // get User information as commentator
    var commentator = this.getUserData();
    
    this.commentService.post(newComment).subscribe(dataReturn => {
      // add commentator attribute and bind information to comments array
      dataReturn.data.commentator = commentator;
      this.comments.unshift(dataReturn.data);
     
    }, err => {
      alert("Something wrong happen!!!");
    })
    
    
  }

  getUserData() {
    return {
      ID: this.storageService.get('id'),
      name: this.storageService.get('username'),
      profilePicture: this.storageService.get('profilePicture'),
    }; 
     
  }

  // set the comment to operate on
  // setSelectedComment(comment) {
  //   this.selectedComment = comment;
  // }

  delete(data) {
    // var id = this.selectedComment.ID;
    // var index; // position of deleted comment in comments
    // for( index = 0; index < this.comments.length; index++) {
    //   if(this.comments[index].ID == id) break;
    // }
    // this.commentService.delete(id).subscribe(data => {
    //   if(data.status == true) this.comments.splice(index,1);
      
    //   else alert("Cannot perform action");  
    // }, err => {
    //   alert("Cannot perform action");
    // })

      this.dialogService.showConfirm().subscribe( flag => {

        if(flag) {

          this.loadingService.show();

          this.commentService.delete(data.ID).subscribe( success => {

            this.comments.splice(this.comments.indexOf(data), 1);
            this.loadingService.hide();
          }, error => {

            this.loadingService.hide();
            this.dialogService.showError("your token is expired!");
          })
        }
      });
  }

}
