import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LandingInfoComponent } from './components/landing-info/landing-info.component';
import { MaterialModule } from 'src/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { EditDialogueComponent } from './components/edit-dialogue/edit-dialogue.component';
import { DeleteDialogComponent } from './components/delete-dialogue/delete-dialogue.component';
import { ClockComponent } from './components/dashboard-utility/clock/clock.component';
import { NavbarComponent } from './components/dashboard-utility/navbar/navbar.component';
import { NewsComponent } from './components/dashboard-utility/news/news.component';
import { AnnouncementsComponent } from './components/dashboard-utility/announcements/announcements.component';
import { UserInfoComponent } from './components/dashboard-utility/user-info/user-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingInfoComponent,
    NumberOnlyDirective,
    EditDialogueComponent,
    DeleteDialogComponent,
    ClockComponent,
    NavbarComponent,
    NewsComponent,
    AnnouncementsComponent,
    UserInfoComponent,
  ],
  imports: [CommonModule, MaterialModule, HttpClientModule],
  exports: [
    HeaderComponent,
    LandingInfoComponent,
    MaterialModule,
    NumberOnlyDirective,
    ClockComponent,
    NavbarComponent,
    NewsComponent,
    AnnouncementsComponent,
    UserInfoComponent,
  ],
})
export class SharedModule {}
