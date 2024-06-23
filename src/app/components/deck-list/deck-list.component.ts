import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss'
})
export class DeckListComponent implements OnInit {

  constructor(
    private deckService: DeckService,
  ) { }

  ngOnInit() {
    // await this.cardService.getAll();
  }

}
