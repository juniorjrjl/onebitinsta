import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage{
  home: string = "HomePage";
  profile: string = "ProfilePage";
  post: string = "NewPostPage";
  search: string = "SearchPage";
  logout: string = "SignOutPage";
}
