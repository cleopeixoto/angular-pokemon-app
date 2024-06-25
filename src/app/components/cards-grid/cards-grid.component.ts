import { Component } from '@angular/core';
import { CardService } from '../../services/card.service';
import { IgxColumnComponent } from 'igniteui-angular';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrl: './cards-grid.component.scss'
})
export class CardsGridComponent {
  cards = [];

  constructor(
    private cardSrv: CardService,
  ) {
    this.cards = this.cardSrv.cards;
  }

  public onColumnInit(column: IgxColumnComponent) {
    if (column.field === 'id') {
      // do something
      // column.formatter = (date => date.toLocaleDateString());
    }
  }
}
