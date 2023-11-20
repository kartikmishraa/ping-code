import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RouterService } from '../services/router.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';

/**
 * @description Lets only logged in users to access route
 * @returns True if user is logged in, else false
 */
export const authGuard: CanActivateFn = (route, state) => {
  let isLoggedIn = false;
  inject(AuthService).isLoggedIn$.subscribe((val) => {
    isLoggedIn = val;
  });
  if (isLoggedIn) return true;
  else {
    inject(ToastService).makeToast('Authentication failed, please login');
    inject(RouterService).redirectToUrl('/login');
  }
  return false;
};
