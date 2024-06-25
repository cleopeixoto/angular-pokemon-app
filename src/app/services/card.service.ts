import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards = new BehaviorSubject<any>([]);

  constructor(
    private generalService: GeneralService
  ) { }

  /**
   * Method to request GET to all cards
   * Subscribe response to watch it inside components
   *    (Another option -with better performance when more time to implement the grid/table- 
   *     would be requesting cards on demand, when changing table page)
   */
  async getAll() {
    await this.generalService.instance.get('/cards?page=1&pageSize=5').then((response) => {
      this.cards.next(response.data.data);
    }).catch((error) => {
      console.error('Unable to get cards', error);
    });
  }
  
}
