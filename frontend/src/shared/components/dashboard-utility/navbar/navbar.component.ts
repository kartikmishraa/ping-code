import { Component, OnInit } from '@angular/core';
import { User } from 'src/shared/interfaces/user.interface';
import { AuthService } from 'src/shared/services/auth.service';
import { RouterService } from 'src/shared/services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user!: User;
  isAdmin = false;

  constructor(public router: RouterService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((user) => {
      this.user = user;

      if (this.user.role === 'Admin') this.isAdmin = true;
    });
  }
}
