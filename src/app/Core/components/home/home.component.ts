import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    #auth0-lock {
      width: 310px;
      margin: 0 auto;
      border-radius: 10px;
      padding: 5px;
      background: white;
      box-shadow: 1px 2px 4px gray;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.lock.show();
  }

}
