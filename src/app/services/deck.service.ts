import { Injectable } from '@angular/core';
import { decks } from '../mockup';
import { IDeck } from '../interfaces/IDeck';
import { generateId } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  decks: IDeck[] = [];

  constructor(
  ) {
    this.decks = decks;
  }

  /**
   * Get a deck by its id, simulating a GET request to the API
   * @param id The ID of the deck
   * @returns The deck object
   */
  getDeck(id: number) {
    return this.decks.find((deck) => deck.id === Number(id));
  }

  /**
   * Create a deck by its id, simulating a POST request to the API
   * @param data The data information of the new deck
   * @returns The new deck object
   */
  createDeck(data: any) {
    const newDeck = {
      id: generateId(this.decks), // Simulate creation of a new deck id (this should be a hidden automatic database step)
      ...data,
    }

    this.decks.push(newDeck);

    return newDeck;
  }

  /**
   * Update a deck, simulating a PUT request to the API
   * @param data The data information to be overriten
   */
  updateDeck(deckId: number, data: any) {
    const deck = this.getDeck(deckId);
    if (!deck) return;

    deck.name = data.name || deck.name;
    deck.cards = data.cards || deck.cards;

    return deck;
  }

  /**
   * Delete a deck by its id, simulating a DELETE request to the API
   * @param id The ID of the deck
   */
  deleteDeck(id: number): void {
    const inx = this.decks.findIndex((deck) => deck.id === id);
    if (inx >= 0) this.decks.splice(inx, 1);
  }
}
