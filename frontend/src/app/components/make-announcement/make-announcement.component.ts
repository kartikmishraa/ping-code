import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Announcement } from 'src/shared/interfaces/announcement.interface';
import { User } from 'src/shared/interfaces/user.interface';
import { ApiService } from 'src/shared/services/api.service';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterService } from 'src/shared/services/router.service';
import { SignalrService } from 'src/shared/services/signalr.service';
import { ToastService } from 'src/shared/services/toast.service';

@Component({
  selector: 'app-make-announcement',
  templateUrl: './make-announcement.component.html',
  styleUrls: ['./make-announcement.component.scss'],
})
export class MakeAnnouncementComponent implements OnInit {
  isLoading = false;
  user!: User;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public router: RouterService,
    private apiService: ApiService,
    private toaster: ToastService
  ) {}

  makeAnnouncementForm = this.fb.group({
    content: ['', Validators.required],
    author: ['', Validators.required],
  });

  ngOnInit(): void {
    this.authService.userData$.subscribe((user) => {
      this.user = user;

      this.makeAnnouncementForm.patchValue({
        author: this.user.name,
      });
    });
  }

  /**
   * @description Creates a REAL-TIME announcement
   */
  handleSubmit(): void {
    // console.log('announcement made!');
    this.isLoading = true;
    let newAnnouncement: Announcement = {
      content: String(this.makeAnnouncementForm.controls.content.value),
      author: String(this.makeAnnouncementForm.controls.author.value),
    };

    this.apiService.postAnnouncement(newAnnouncement).subscribe(() => {
      this.toaster.makeToast('Announcement made!');
      this.isLoading = false;
      this.router.redirectToUrl('/dashboard');
    });
  }

  /**
   * @description Resets the form values
   */
  reset(): void {
    this.makeAnnouncementForm.patchValue({
      content: '',
      author: this.user.name,
    });
  }
}
