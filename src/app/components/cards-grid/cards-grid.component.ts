import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CardService } from '../../services/card.service';
import { IRowSelectionEventArgs, IgxGridComponent } from 'igniteui-angular';
import { ICard } from '../../interfaces/ICard';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrl: './cards-grid.component.scss'
})
export class CardsGridComponent implements OnInit {
  @ViewChild('cardsGrid', { static: true }) public cardsGrid: IgxGridComponent | undefined;
  @Input() selectedCards: any = [];
  @Input() viewOnly = false;
  @Output() notifyParent = new EventEmitter<any>();

  cards = [];

  constructor(
    private cardSrv: CardService,
  ) { }

  ngOnInit(): void {
    if (this.viewOnly && this.selectedCards.length) {
      this.cards = this.selectedCards;
      return;
    }

    // Retrieve cards
    this.cardSrv.cards.subscribe((data) => {
      this.cards = data;
    });

    // Set pre-selected cards based on input
    if (this.selectedCards.length) {
      this.cardsGrid?.selectRows(this.selectedCards.map((card: any) => card.id));
    }
  }

  /**
   * Method to handle rows selection - Assign to local selectedCards variable and emit to parent
   * @param event The IGX rows event
   */
  public handleCardsSelection(event: IRowSelectionEventArgs) {
    this.selectedCards = event.newSelection;

    this.notifyParent.emit(this.selectedCards);
  }
}
