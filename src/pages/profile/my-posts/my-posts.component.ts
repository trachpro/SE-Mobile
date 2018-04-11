import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html'
})
export class MyPostsComponent implements OnInit {

  private postList: Array<any> = [];
  private page: number = 1;
  @Input() user: any;

  private params: any = {};

  constructor() { }

  ngOnInit() {

    this.postList = this.user.posts;

    let tem = JSON.parse(JSON.stringify(this.user));

    delete tem.posts;

    this.postList.forEach( element => {

      element.author = tem;
    })
    
    console.log("post: ", this.postList);
  }
}
