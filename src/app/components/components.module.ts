import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FollowingComponent } from "./following/following.component";
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post-list/post-list.component";
import { ProfileComponent } from "./profile/profile.component";
import { LikeComponent } from "./like/like.component";

@NgModule({
    imports:[CommonModule],
    declarations:[FollowingComponent,
        HeaderComponent,
        PostListComponent,
        ProfileComponent,
        LikeComponent],
    exports:[FollowingComponent,
        HeaderComponent,
        PostListComponent,
        ProfileComponent,
        LikeComponent],
})
export class ComponentsModule{}