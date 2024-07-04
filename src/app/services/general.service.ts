import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  headers;

  constructor() {
    this.headers = new HttpHeaders({
      'X-Api-Key': environment.pokemonApiKey
    });
  }
}
