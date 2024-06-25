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
   *     would be requesting cards on demand, when changing table page and filters)
   */
  async getAll() {
    await this.generalService.instance.get('/cards').then((response) => {
      this.cards.next(response.data.data);
    }).catch((error) => {
      console.error('Unable to get cards', error);
    });


    // Below is a implementation to get data from all pages (not used) - not recommended
    // const response = await this.generalService.instance.get('/cards');
    // const responses = await Promise.all(
    //     Array.from(
    //         Array(response.data.pagesRequired),
    //         (_, i) => fetch(`/cards?page=${i}`)
    //     )
    // );
  }
  
}
