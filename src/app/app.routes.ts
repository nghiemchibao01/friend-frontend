import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Friends } from './features/friend/pages/friends/friends';
import { FriendDetail } from './features/friend/pages/friend-detail/friend-detail';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { FriendForm } from './features/friend/components/friend-form/friend-form';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'friends', component: Friends },
  { path: 'friend/add', component: FriendForm },
  { path: 'friend/:id', component: FriendDetail },
  { path: 'friend/edit/:id', component: FriendForm },
  { path: 'about', component: About },
  { path: '**', component: NotFound },
];
