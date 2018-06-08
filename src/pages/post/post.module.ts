import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostPage } from './post';
import { RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment';
import { CommentDetailComponent } from './comment/comment-detail/comment-detail';

@NgModule({
  declarations: [
    PostPage,
    CommentComponent,
    CommentDetailComponent
  ],
  imports: [
    IonicPageModule.forChild(PostPage),
    RouterModule
  ],
})
export class PostPageModule {}
