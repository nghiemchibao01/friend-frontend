import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../../services/friend';
import { Friend } from '../../models/Friend';
import { FieldConfig } from '../../../../shared/models/form/field-config';
import { FRIEND_FIELDS } from './friend-form.fields';
import { DynamicForm } from '../../../../shared/components/dynamic-form/dynamic-form';

@Component({
  selector: 'app-friend-form',
  imports: [ReactiveFormsModule, DynamicForm],
  templateUrl: './friend-form.html',
  styleUrl: './friend-form.scss',
})
export class FriendForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private friendService = inject(FriendService);

  isEdit: boolean = false;
  friendId: number | null = null;
  data: Friend | null = null;
  fields: FieldConfig[] = FRIEND_FIELDS;

  ngOnInit(): void {
    this.friendId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.friendId) {
      this.isEdit = true;
      this.friendService.getFriendById(this.friendId).subscribe((friend) => {
        this.data = friend;
      });
    }
  }

  onSubmit(model: any): void {
    const request =
      this.isEdit && this.friendId
        ? this.friendService.updateFriend(this.friendId, model)
        : this.friendService.createFriend(model);

    request.subscribe({
      next: () => this.router.navigate(['/friends']),
      error: (e) => console.error(e),
    });
  }
}
