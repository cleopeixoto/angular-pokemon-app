import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: any = [];

  constructor(
    private generalService: GeneralService
  ) { }

  async getAll() {
    const data = await this.generalService.instance.get('/cards').then((response) => {
      return response.data.data;
    });

    this.cards = data;
  }
}
