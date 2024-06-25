import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';

// Libs
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

// Ignite
import { 
	IgxAvatarModule,
	IgxBadgeModule,
	IgxButtonModule,
	IgxGridModule,
	IgxIconModule,
	IgxInputGroupModule,
	IgxProgressBarModule,
	IgxRippleModule,
	IgxSwitchModule
 } from "igniteui-angular";

// Components
import { AppComponent } from './app.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { CardsGridComponent } from './components/cards-grid/cards-grid.component';

registerLocaleData(ptBr);
@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		CommonModule,
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,

		IgxAvatarModule,
		IgxBadgeModule,
		IgxButtonModule,
		IgxGridModule,
		IgxIconModule,
		IgxInputGroupModule,
		IgxProgressBarModule,
		IgxRippleModule,
		IgxSwitchModule,
	],
	exports: [
		RouterModule,
	],
	declarations: [
		AppComponent,
		DeckListComponent,
		DeckDetailsComponent,
  CardsGridComponent,
	],
	bootstrap: [AppComponent],
	providers: [
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
	]
})
export class AppModule {
}
