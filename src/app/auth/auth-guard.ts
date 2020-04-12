import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService ) {}

  canActivate() {
    return this.authService.user.pipe(map(user => {
      return !!user;
    }))
  }
}
