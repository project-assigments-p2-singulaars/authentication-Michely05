import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.getItem('token');

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  return true;
};
