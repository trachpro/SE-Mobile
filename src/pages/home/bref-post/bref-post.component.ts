import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormatService } from '../../../core/util/format.service';

@Component({
  selector: 'app-bref-post',
  templateUrl: './bref-post.component.html'
})
export class BrefPostComponent implements OnInit {

  @Input() post: any;
  @Input() isProfile: Boolean;
  
  constructor(
    private formatService: FormatService,
    private navCtr: NavController
  ) { }

  ngOnInit() {
  }

  gotoDetail() {

    this.navCtr.push('PostPage', {

      id: this.post.ID
    });
  }

  gotoTopic() {

    this.navCtr.push('CategoryPage', {topic: this.post.category.ID});
  }

  gotoAuthor() {

    this.navCtr.push('ProfilePage', {id: this.post.authorID? this.post.authorID: this.post.author.ID});
  }
}
