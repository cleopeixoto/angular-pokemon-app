import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards = [];

  constructor(
    private generalService: GeneralService,
    private httpClient: HttpClient,
  ) { }

  /**
   * Method to request GET to all cards
   * Subscribe response to watch it inside components
   *    (Another option -with better performance when more time to implement the grid/table- 
   *     would be requesting cards on demand, when changing table page and filters)
   */

  getAll() {
    const url = `${environment.pokemonApiUrl}/cards?page=1&pageSize=5`
    this.httpClient.get(url, { headers: this.generalService.headers }).subscribe((response: any) => {
      this.cards = response.data;
    }, (error) => {
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
