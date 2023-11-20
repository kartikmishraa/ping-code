import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LandingInfoComponent } from 'src/shared/components/landing-info/landing-info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from 'src/shared/guards/auth.guard';
import { DirectoryComponent } from './components/directory/directory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChatsPageComponent } from './components/chats-page/chats-page.component';
import { MakeAnnouncementComponent } from './components/make-announcement/make-announcement.component';

const routes: Routes = [
  {
    path: '',
    title: 'Ping',
    component: LandingPageComponent,
    children: [
      { path: '', component: LandingInfoComponent },
      { path: 'register', title: 'Register', component: RegisterComponent },
      { path: 'login', title: 'Login', component: LoginComponent },
    ],
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'directory',
    title: 'Users Directory',
    component: DirectoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    title: 'My Profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile/edit',
    title: 'Edit Profile',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'chats',
    title: 'Chats',
    component: ChatsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'announcements',
    title: 'Announcements',
    component: MakeAnnouncementComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
