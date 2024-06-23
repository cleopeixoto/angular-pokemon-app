import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = "Angular Pokemon Application";

  constructor(
    private cardSrv: CardService
  ) {
    // this.cardSrv.getAll();
  }
}
