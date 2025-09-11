import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/Friend';
import { FriendService } from '../../services/friend';
import { FriendCard } from '../../components/friend-card/friend-card';

@Component({
  selector: 'app-friends',
  imports: [FriendCard],
  templateUrl: './friends.html',
  styleUrl: './friends.scss',
})
export class Friends implements OnInit {
  friends: Friend[] = [];
  filteredFriends: Friend[] = [];
  isLoading = true;
  filterText = '';

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    this.friendService.getFriends().subscribe({
      next: (data) => {
        this.friends = data;
        this.filteredFriends = this.friends;
        this.isLoading = false;
        console.log('Fetched friends:', data);
        console.log(this.friends);
      },
      error: (e) => {
        this.isLoading = false;
        console.error(e);
      },
    });
  }

  onSearch(value: string): void {
    const search = value.trim().toLowerCase();

    if (!search) {
      this.filteredFriends = this.friends;
      return;
    }

    this.filteredFriends = this.friends.filter(
      (friend) =>
        (friend.info.fullName || '').toLowerCase().includes(search) ||
        (friend.contact.phone || '').includes(search) ||
        (friend.contact.email || '').toLowerCase().includes(search)
    );
  }
}
