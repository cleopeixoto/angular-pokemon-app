import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { IDeck } from '../../interfaces/IDeck';
import { Router } from '@angular/router';


@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss'
})
export class DeckListComponent implements OnInit {
  decks: IDeck[] = [];

  constructor(
    private router: Router,
    private deckService: DeckService,
  ) { }

  ngOnInit() {
    this.decks = this.deckService.decks;
  }

  /**
   * Delete a deck
   * @param id Deck id
   */
  confirmDelete(id: number) {
    this.deckService.deleteDeck(id);
  }

  /**
   * Go to Deck Details page
   * @param deckId The ID of the deck
   */
  goToDeckDetails(deckId: number, mode: string) {
    const modeParam = mode === 'view' ? 'details' : 'edit';
    this.router.navigate([`deck/${deckId}/${modeParam}`]).then();
  }

}
