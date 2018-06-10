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

    this.post.subtitle = this.post.subtitle? this.post.subtitle.split(' ').slice(0,40).join(' '): '';
  }

  gotoDetail() {

    this.navCtr.push('PostPage', {

      id: this.post.ID
    });
  }

  gotoTopic() {

    this.navCtr.push('CategoryPage', { topic: this.post.category.ID }).then(async () => {

      while (this.navCtr.length() != 1) {

        await this.navCtr.remove(this.navCtr.length() - 2).then(() => {

          // console.log("1length: ", this.nav.length());
        });
      }
    });
  }

  gotoAuthor() {

    this.navCtr.push('ProfilePage', {id: this.post.authorID? this.post.authorID: this.post.author.ID}).then(async () => {

      while (this.navCtr.length() != 1) {

        await this.navCtr.remove(this.navCtr.length() - 2).then(() => {

          // console.log("1length: ", this.nav.length());
        });
      }
    });
  }
}
