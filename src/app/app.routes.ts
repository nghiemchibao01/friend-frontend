import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Friends } from './pages/friends/friends';
import { FriendDetail } from './pages/friend-detail/friend-detail';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'friends', component: Friends},
    {path: 'friend/:id', component: FriendDetail},
    {path: 'about', component: About},
    {path: '**', component: NotFound},
];
