import { Component, OnInit } from '@angular/core';
import { Friend } from '../../models/Friend';
import { FriendService } from '../../services/friend';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-friend-detail',
  imports: [],
  templateUrl: './friend-detail.html',
  styleUrl: './friend-detail.scss',
})
export class FriendDetail implements OnInit {
  friend: Friend | null = null;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private friendService: FriendService) {}

  ngOnInit(): void {
    const nav = this.location.getState() as { friend: Friend };
    this.friend = nav?.friend || null;
    
    if (this.friend) {
      this.isLoading = false;
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.friendService.getFriendById(id).subscribe({
      next: (data) => {
        this.friend = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
