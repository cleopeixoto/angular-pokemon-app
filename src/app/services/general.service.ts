import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  instance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env["POKEMON_API_URL"],
      headers: {
        "X-Api-Key": process.env["POKEMON_API_KEY"]
      }
    });
  }
}
