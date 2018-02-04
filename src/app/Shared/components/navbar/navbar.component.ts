import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {

  burgerSwitch: boolean;

  constructor(public auth: AuthService) { }

  toggleBurger() {
    this.burgerSwitch = !this.burgerSwitch;
  }

}
