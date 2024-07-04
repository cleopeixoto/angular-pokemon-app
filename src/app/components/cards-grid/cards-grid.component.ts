import { Component, input, OnInit, output, viewChild } from '@angular/core';
import { CardService } from '../../services/card.service';
import { IRowSelectionEventArgs, IgxGridComponent } from 'igniteui-angular';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrl: './cards-grid.component.scss'
})
export class CardsGridComponent implements OnInit {  
  cardsGrid = viewChild<IgxGridComponent>('cardsGrid');
  selectedCards = input<any>([]);
  viewOnly = input(false);
  notifyParent = output<any>();

  cards = [];

  constructor(
    private cardSrv: CardService,
  ) { }

  ngOnInit(): void {
    if (this.viewOnly() && this.selectedCards().length) {
      this.cards = this.selectedCards();
      return;
    }

    // Retrieve cards
    this.cards = this.cardSrv.cards;

    // Set pre-selected cards based on input
    if (this.selectedCards().length) {
      this.cardsGrid()?.selectRows(this.selectedCards().map((card: any) => card.id));
    }
  }

  /**
   * Method to handle rows selection - Assign to local selectedCards variable and emit to parent
   * @param event The IGX rows event
   */
  public handleCardsSelection(event: IRowSelectionEventArgs) {
    const newSelectedCards = event.newSelection;

    this.notifyParent.emit(newSelectedCards);
  }
}
