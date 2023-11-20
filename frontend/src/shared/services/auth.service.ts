import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { RouterService } from './router.service';
import { User } from '../interfaces/user.interface';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Tracks LoogedIn status of the user
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  // For storing user data
  private _userData$ = new BehaviorSubject<User>({
    email: 'tt',
    password: 'pp',
    role: 'xx',
    isProfileSetup: false,
  });
  public userData$: Observable<User> = this._userData$.asObservable();

  // Token name in localStorage
  private readonly TOKEN_NAME = 'JWT';

  constructor(
    private apiService: ApiService,
    private router: RouterService,
    private toaster: ToastService
  ) {
    this._isLoggedIn$.next(!!this.token);

    // Check if userData exists in localStorage
    // Better approach would be to check for JWT and authenticate with server again
    let existingUser: User = JSON.parse(`${localStorage.getItem('userData')}`);
    if (existingUser) {
      this._userData$.next(existingUser);
    }
  }

  // Validate necessity
  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  /**
   * @description Login user
   * @param email email id of user
   * @param password password of user
   * @returns An observable with the JWT token
   */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.apiService.loginUser(email, password).pipe(
      tap((response) => {
        // Set login status TRUE
        this._isLoggedIn$.next(true);

        // Store token in LOCAL STORAGE
        localStorage.setItem(this.TOKEN_NAME, response.token);

        // Parsing USER ID from the token
        const id = this.getPayloadFromToken(response.token)['sub'];

        // Ideally should store this role and user it for authorization
        const role = this.getPayloadFromToken(response.token)[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];

        // Fetch User details by ID and store in userData Subject
        this.apiService.fetchUser(id).subscribe((user) => {
          this._userData$.next(user);
          localStorage.setItem('userData', JSON.stringify(user));

          // If user profile is not setup then redirect to edit-profile section
          if (!user.isProfileSetup) {
            this.router.redirectToUrl('/profile/edit');
            this.toaster.makeToast('Please complete your profile');
          }
        });
      })
    );
  }

  /**
   * @description Register user
   * @param email email id of user
   * @param password password of user
   * @returns An observable with the JWT token
   */
  register(email: string, password: string): Observable<AuthResponse> {
    return this.apiService.registerUser(email, password);
  }

  /**
   * @param token JWT Token
   * @returns The payload of the JWT token
   */
  private getPayloadFromToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }

  /**
   * @description Logout Functionality
   */
  logout(): void {
    // Remove token and userData from LocalStorage
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem('userData');

    // Set login status to FALSE
    this._isLoggedIn$.next(false);

    this.toaster.makeToast('Logged out successfully');

    // Redirect to home
    this.router.redirectToUrl('/');
  }

  updateUserData(id: string): void {
    // Fetch User details by ID and store in userData Subject
    this.apiService.fetchUser(id).subscribe((user) => {
      this._userData$.next(user);
      localStorage.setItem('userData', JSON.stringify(user));
    });
  }
}
