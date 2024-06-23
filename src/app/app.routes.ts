import { Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list.component';

const DEFAULT_ROUTE = '/home';

export const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'home', component: DeckListComponent },
];
