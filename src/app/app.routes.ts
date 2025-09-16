import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Friends } from './features/friend/pages/friends/friends';
import { FriendDetail } from './features/friend/pages/friend-detail/friend-detail';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { FriendForm } from './features/friend/pages/friend-form/friend-form';


export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home - Friend App',
  },
  {
    path: 'friends',
    component: Friends,
    title: 'Friends List - Friend App',
  },
  {
    path: 'friend/add',
    component: FriendForm,
    title: 'Add Friend - Friend App',
  },
  {
    path: 'friend/:id',
    component: FriendDetail,
    title: 'Friend Detail - Friend App',
  },
  {
    path: 'friend/edit/:id',
    component: FriendForm,
    title: 'Edit Friend - Friend App'
  },
  {
    path: 'about',
    component: About,
    title: 'About - Friend App',
  },
  {
    path: '404',
    component: NotFound,
    title: '404 Not Found - Friend App',
  },
  {
    path: '**',
    component: NotFound,
    title: '404 Not Found - Friend App',
  },
];
