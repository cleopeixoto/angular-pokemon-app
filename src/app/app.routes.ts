import { Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';

const DEFAULT_ROUTE = '/home';

export const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'home', component: DeckListComponent },
  { 
    path: 'deck',
    children: [
      { path: 'new', component: DeckDetailsComponent },
      { path: ':id/details', component: DeckDetailsComponent },
      { path: ':id/edit', component: DeckDetailsComponent },
    ]
   },
];
