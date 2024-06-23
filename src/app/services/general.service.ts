import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: environment.pokemonApiUrl,
      headers: {
        "X-Api-Key": environment.pokemonApiKey
      }
    });
  }
}
