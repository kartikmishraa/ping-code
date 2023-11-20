import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/interfaces/user.interface';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((user) => {
      this.user = user;
    });
  }
}
