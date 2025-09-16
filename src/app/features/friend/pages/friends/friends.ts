import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Friend } from '../../models/Friend';
import { FriendService } from '../../services/friend';
import { FriendCard } from '../../components/friend-card/friend-card';
import { Loader } from '../../../../shared/components/loader/loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  imports: [FriendCard, Loader],
  templateUrl: './friends.html',
  styleUrl: './friends.scss',
})
export class Friends implements OnInit {
  private friendService = inject(FriendService);
  private router = inject(Router);

  friends: Friend[] = [];
  filteredFriends: Friend[] = [];
  isLoading = true;
  filterText = '';

  ngOnInit(): void {
    this.friendService.getFriends().subscribe({
      next: (data) => {
        this.friends = data;
        this.filteredFriends = this.friends;
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        this.router.navigate(['404']);
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
