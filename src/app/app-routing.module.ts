import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeckListComponent } from './components/deck-list/deck-list.component';

export const DEFAULT_ROUTE = '/home';

const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'home', component: DeckListComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

