import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent {

  @Input() 
  likeCount;
  @Input() 
  isLiked = false;
 
  @Output() 
  public onLike = new EventEmitter();
  @Output() 
  public onUnlike = new EventEmitter();

  like() {
    this.onLike.emit();
  }
 
  
  unlike() {
    this.onUnlike.emit();
  }


}
