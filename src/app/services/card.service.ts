import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: any = [];
  types = [];
  subtypes = [];
  supertypes = [];

  constructor(
    private generalService: GeneralService
  ) { }

  async initCards() {
    this.getAll();
    this.getTypes();
    this.getSubtypes();
    this.getSupertypes();
  }

  async getAll() {
    const data = await this.generalService.instance.get('/cards?page=1&pageSize=5').then((response) => {
      return response.data.data;
    }).catch((error) => {
      console.error('Unable to get cards', error);
    });

    this.cards = data;
  }

  async getTypes() {
    await this.generalService.instance.get('/types').then((response) => {
      this.types = response.data.data;
    });
  }

  async getSubtypes() {
    await this.generalService.instance.get('/subtypes').then((response) => {
      this.subtypes = response.data.data;
    });
  }

  async getSupertypes() {
    await this.generalService.instance.get('/supertypes').then((response) => {
      this.supertypes = response.data.data;
    });
  }

  
}
