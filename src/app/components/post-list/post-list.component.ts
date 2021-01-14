import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../models/post';
import { User } from '../../models/user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent {

  @Input()
  posts: Post[];
  @Input()
  currentList = "details";
  @Input()
  showToolbar = false;

  constructor(private router: Router) { }

  changeList(newList){
    this.currentList = newList;
  }

  detailUser(user: User) {
    this.router.navigate([`tabs/user/${user.id}`]);
  }

  writeDescriptionWithHashtags(description){
    return description.replace(new RegExp(/#\w+/, "gi"), match => `<b>${match}</b>`)
  }

}
