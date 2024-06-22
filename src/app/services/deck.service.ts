import { Injectable } from '@angular/core';
import { decks } from '../mockup';
import { IDeck } from '../interfaces/IDeck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  decks: IDeck[] = [];

  constructor(
  ) {
    this.decks = decks;
  }
}
