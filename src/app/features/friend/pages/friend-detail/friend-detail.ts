import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Friend } from '../../models/Friend';
import { FriendService } from '../../services/friend';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Loader } from '../../../../shared/components/loader/loader';

@Component({
  selector: 'app-friend-detail',
  imports: [Loader],
  templateUrl: './friend-detail.html',
  styleUrl: './friend-detail.scss',
})
export class FriendDetail implements OnInit {
  friend: Friend | null = null;
  isLoading: boolean = true;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private friendService = inject(FriendService);

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
        this.router.navigate(['404']);
        this.isLoading = false;
      },
    });
  }
}
