import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeckService } from '../../services/deck.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { CardService } from '../../services/card.service';
import { ICard } from '../../interfaces/ICard';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrl: './deck-details.component.scss',
})
export class DeckDetailsComponent implements OnInit {
  deckId!: number;
  deckModes = {
    CREATE: 1,
    READ: 2,
    UPDATE: 3,
  }
  deckMode: number;
  currentDeck: any;

  filteredCards: ICard[] = [];

  displayNotification: boolean | any = false;
  customErrors = {
    existingDeck: false,
    invalidForm: false,
  };

  deckForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    cards: [[]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckSrv: DeckService,
    private formBuilder: FormBuilder,
    private cardSrv: CardService,
  ) {
    this.deckMode = this.deckModes.READ; // default option

    this.filteredCards = this.cardSrv.cards;
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params?.['id'];

    // New deck
    if (!id) {
      this.deckMode = this.deckModes.CREATE;
      return;
    }

    // Edit mode option
    this.route.snapshot.url.forEach((urlObj) => {
      if (urlObj.path === 'edit') this.deckMode = this.deckModes.UPDATE;
    });

    // Existing deck
    this.deckId = id;
    this.setCurrentFormValues();
  }

  /**
   * In case of an existing deck, get deck's data
   */
  setCurrentFormValues(): void {
    const currentDeck = this.deckSrv.getDeck(this.deckId);
    if (!currentDeck) {
      console.error('Deck not found')
      return;
    }
    
    this.currentDeck = currentDeck;

    this.deckForm.setValue({
      name: currentDeck?.name ?? '',
      cards: currentDeck?.cards ?? [],
    });
  }

  /**
   * Submit form in order to creating a deck or updating it
   */
  onSubmit(): void {
    if (!this.deckForm.valid) return;

    // Get deck form data
    const deckData = this.deckForm.value;

    // Create new deck: send deck data to POST
    if (this.deckMode === this.deckModes.CREATE) {
      this.deckSrv.createDeck(deckData);
        
      this.goToHome();
      return;
    }

    // Edit deck mode: Send deck to PUT
    this.deckSrv.updateDeck(this.deckId, deckData);
    this.goToHome();
  }

  /**
   * Check if there's already a deck with given name
   * @param name Given name
   */
  onNameChange(name: string) {
    const existingDeck = this.deckSrv.decks.find((deck) => deck.name.toUpperCase() === name.toUpperCase());

    // Updating form name control
    if (!existingDeck) delete this.deckForm.controls['name'].errors?.['existingDeck'];
    else this.deckForm.controls['name'].setErrors({ existingDeck: true });
  }

  /**
   * Check if is there any custom error
   * @returns Return true if there's a custom error. False if it isn't
   */
  hasCustomErrors(): boolean {
    return Object.values((this.customErrors)).some((error) => !!error);
  }

  /**
   * Action when canceling
   */
  onCancel(): void {
    if (this.deckMode === this.deckModes.UPDATE) {
      this.deckMode = this.deckModes.READ;
      this.deckForm.markAsUntouched();

      // Reset form values to originals
      this.deckForm.controls['name'].setValue(this.currentDeck.name);
    }

    this.goToHome();
  }

  /**
   * Go to home page, application default route
   */
  goToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
