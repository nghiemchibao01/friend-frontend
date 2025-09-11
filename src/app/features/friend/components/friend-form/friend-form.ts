import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../../services/friend';
import { Friend } from '../../models/Friend';

@Component({
  selector: 'app-friend-form',
  imports: [ReactiveFormsModule],
  templateUrl: './friend-form.html',
  styleUrl: './friend-form.scss',
})
export class FriendForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private friendService = inject(FriendService);

  friendForm = this.formBuilder;
  isEdit: boolean = false;
  friendId: number | null = null;
  isLoading: boolean = false;

  expanded: string | null = 'basicInfo';

  ngOnInit(): void {
    this.friendForm = this.formBuilder.group({
      basicInfo: this.formBuilder.group({
        fullName: ['', Validators.required],
        nickName: [''],
        birthDay: [''],
      }),
      contactInfo: this.formBuilder.group({
        phone: [''],
        email: ['', Validators.email],
        address: [''],
        fb: [''],
        ins: [''],
      }),
      education: this.formBuilder.group({
        elementarySchool: [''],
        middleSchool: [''],
        highSchool: [''],
        university: [''],
      }),
      parentInfo: this.formBuilder.group({
        fatherName: [''],
        motherName: [''],
      }),
      hobby: [''],
    });

    this.friendId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.friendId) {
      this.isEdit = true;
      this.isLoading = true;
      this.friendService.getFriendById(this.friendId).subscribe((friend) => {
        this.patchFriendForm(friend);
      });
    }
  }

  private patchFriendForm(friend: Friend): void {
    this.friendForm.patchValue({
      basicInfo: {
        fullName: friend.info.fullName,
        nickName: friend.info.nickName,
        birthDay: friend.info.birthDay,
      },
      contactInfo: friend.contact,
      education: {
        elementarySchool: friend.info.elementarySchool,
        middleSchool: friend.info.middleSchool,
        highSchool: friend.info.highSchool,
        university: friend.info.university,
      },
      parentInfo: friend.parent,
      hobby: friend.info.hobby,
    });
  }

  toggle(section: string): void {
    this.expanded = this.expanded === section ? null : section;
  }

  onSubmit(): void {
    if (this.friendForm.invalid) return;
    const friendData = this.friendForm.value;

    const request =
      this.isEdit && this.friendId
        ? this.friendService.updateFriend(this.friendId, friendData)
        : this.friendService.createFriend(friendData);

    request.subscribe({
      next: () => this.router.navigate(['/friends']),
      error: (e) => console.error(e),
    });
  }
}
