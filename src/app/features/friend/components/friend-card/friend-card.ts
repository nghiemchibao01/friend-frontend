import { Component, Input } from '@angular/core';
import { Friend } from '../../models/Friend';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-friend-card',
  imports: [RouterLink],
  templateUrl: './friend-card.html',
  styleUrl: './friend-card.scss'
})
export class FriendCard {
  @Input() friend!: Friend;
}
