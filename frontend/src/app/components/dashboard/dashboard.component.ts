import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/interfaces/user.interface';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    // Getting user data
    this.authService.userData$.subscribe({
      next: (val) => {
        this.user = val;
      },
    });
  }
}
