import { Component, OnInit } from '@angular/core';
import { AuthService } from './Shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthentication();
  }

}
