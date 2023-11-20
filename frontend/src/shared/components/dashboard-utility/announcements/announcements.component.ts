import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/shared/interfaces/announcement.interface';
import { ApiService } from 'src/shared/services/api.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss'],
})
export class AnnouncementsComponent implements OnInit {
  announcements!: Announcement[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAnnouncements().subscribe((data) => {
      this.announcements = data;
    });
  }
}
