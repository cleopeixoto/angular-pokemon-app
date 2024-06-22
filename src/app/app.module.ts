import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';

// import { LOCALE_ID } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { CommonModule, registerLocaleData } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

registerLocaleData(ptBr);
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    // HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatIconModule,
    // MatSelectModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class AppModule { }