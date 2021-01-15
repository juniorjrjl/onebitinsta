import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {

  users: User[] = [];
  posts: Post[] = [];

  constructor(private router: Router,private searchService: SearchService) { }

  search(ev: any) {
    this.searchService.search(ev.target.value).then(response => {
      this.users = response.users;
      this.posts = response.posts;
    }, () => {});
  }

  goToUserPage(user) {
    this.router.navigate([`tabs/user/${user.id}`]);
  }
 
 
  writeDescriptionWithHashtags(description) {
    return description.replace(new RegExp(/#\w+/, "gi"), match => `<b>${match}</b>`);
  }
}
