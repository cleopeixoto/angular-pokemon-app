import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardService } from '../../services/card.service';
import { IRowSelectionEventArgs, IgxColumnComponent } from 'igniteui-angular';
import { ICard } from '../../interfaces/ICard';

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrl: './cards-grid.component.scss'
})
export class CardsGridComponent implements OnInit {
  @Input() selectedCards: any = [];
  @Input() viewOnly = false;
  @Output() notifyParent = new EventEmitter<any>();

  cards = [];

  constructor(
    private cardSrv: CardService,
  ) { }

  ngOnInit(): void {
    if (this.selectedCards.length) {
      this.cards = this.selectedCards;
      return;
    }

    this.cardSrv.cards.subscribe((data) => {
      this.cards = data;
    });
  }

  public handleCardsSelection(event: IRowSelectionEventArgs) {
    this.selectedCards = event.newSelection;
  }
}
