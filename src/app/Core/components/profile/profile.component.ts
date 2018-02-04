import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
    .top {
      margin-top: 20px;
    }

    .circle {
      border-radius: 2018px;
    }
  `]
})
export class ProfileComponent implements OnInit {

  profile: any;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) this.profile = JSON.parse(localStorage.getItem('profile'));
  }

}
