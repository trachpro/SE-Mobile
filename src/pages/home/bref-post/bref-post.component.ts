import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormatService } from '../../../core/util/format.service';

@Component({
  selector: 'app-bref-post',
  templateUrl: './bref-post.component.html'
})
export class BrefPostComponent implements OnInit {

  @Input() post: any;
  
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
}
