import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Angular Pokemon Application";

  constructor(
    private router: Router,
    private cardSrv: CardService
  ) {

    // Requesting all cards when initiating application
    // This way, when the user enters to manipulate list, it's already fulfilled
    this.cardSrv.getAll();
  }

  goToHome() {
    this.router.navigate(['/home']).then();
  }
}
