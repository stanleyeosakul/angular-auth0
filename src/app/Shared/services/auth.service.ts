import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from '../keys/keys';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';

@Injectable()
export class AuthService {

  lock = new Auth0Lock(AUTH_CONFIG.clientID, AUTH_CONFIG.domain, {
    container: 'auth0-lock',
    auth: {
      redirectUrl: AUTH_CONFIG.callbackURL,
      responseType: 'token id_token',
      params: {
        scope: 'openid profile'
      }
    },
    theme: {
      logo: '../assets/images/angular.png',
      primaryColor: '#b52e31'
    },
    languageDictionary: {
      emailInputPlaceholder: 'Email',
      passwordInputPlaceholder: 'Password',
      title: 'Angular Auth0'
    },
  });

  constructor(public router: Router) { }

  login(): void {
    this.lock.show();
  }

  // Routes user and gets profile information based on authentication result
  handleAuthentication(): void {
    this.lock.on('authenticated', (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, authResult.idTokenPayload);
        this.router.navigate(['/profile']);
      }
    });
    this.lock.on('authorization_error', (err) => this.router.navigate(['/']));
  }

  // Store tokens, expiry time, and profile information in localStorage
  private setSession(authResult, profile): void {
    // Access Token will expire in 7200 * 100 seconds or 8.33 days
    const expiresAt = JSON.stringify((authResult.expiresIn * 100) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  // User logout
  logout(): void {
    // Remove tokens, expiry time, and profile information from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  // Evaluate if user is logged in
  isAuthenticated(): boolean {
    // Check whether the current time is past the access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}

