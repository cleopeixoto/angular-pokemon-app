import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeckService } from '../../services/deck.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  hasCardsChanged = false;
  selectedCards = [];
  cardsLoading = false;

  displayNotification: boolean | any = false;
  customErrors = {
    cardsLimit: false,
    cardsSameName: false,
  };

  deckForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deckSrv: DeckService,
    private formBuilder: FormBuilder,
  ) {
    this.deckMode = this.deckModes.READ; // default option
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
    this.selectedCards = this.currentDeck.cards;

    this.deckForm.setValue({
      name: currentDeck?.name ?? '',
    });
  }

  
  /**
   * Validate selected cards
   */
  validateCards(): void  {
    // Deck must have at least 24 cards and not exceed 60 cards
    if (this.selectedCards.length < 24 || this.selectedCards.length > 60) this.customErrors.cardsLimit = true;
    
    // Deck must have maximum 4 cards with the same name
    let nameAppears: any = {};
    this.selectedCards.forEach((card: ICard) => {
      let nameCount = nameAppears[card.name];
      if (!nameCount) nameCount = 0;
      else nameCount ++;

      if (nameCount >= 4) this.customErrors.cardsSameName = true;
    });
  }

  /**
   * Submit form in order to creating a deck or updating it
   */
  onSubmit(): void {
    if (!this.deckForm.valid) return;

    // Get deck form data
    const deckData = {
      name: this.deckForm.controls['name'].value,
      cards: this.selectedCards
    }

    // Create new deck: send deck data to POST
    if (this.deckMode === this.deckModes.CREATE) {
      this.deckSrv.createDeck(deckData);
        
      this.goToHome();
      return;
    }

    // Edit deck mode: Send deck to PUT
    this.validateCards();
    if (this.hasCustomErrors()) return;

    
    this.currentDeck = this.deckSrv.updateDeck(this.deckId, deckData);
    this.goToHome();
  }

  /**
   * Check if there's already a deck with given name
   * @param name Given name
   */
  onNameChange(name: string) {
    const existingDeck = this.deckSrv.decks.find((deck) => (
      deck.name.trim().toUpperCase() === name.trim().toUpperCase()
      && name.trim().toUpperCase() !== this.currentDeck?.name?.trim()?.toUpperCase()
    ));

    // Updating form name control
    if (!existingDeck) delete this.deckForm.controls['name'].errors?.['existingDeck'];
    else this.deckForm.controls['name'].setErrors({ existingDeck: true });
  }

  /**
   * Assign selected cards to given cards from child cards-grid component
   * @param cards Given cards
   */
  onCardSelectChange(cards: any) {
    this.selectedCards = cards;

    // Clear errors on change
    this.customErrors.cardsLimit = false;
    this.customErrors.cardsSameName = false;

    // Check if user has changed selected cards
    this.hasCardsChanged = this.hasChanged();
  }

  /**
   * Check if selected cards has changed
   */
  hasChanged(): boolean {
    const selectedCardsIds = this.selectedCards.map((card: any) => card.id);
    const currentDeckCardsIds = this.currentDeck.cards.map((card: any) => card.id);

    return JSON.stringify(selectedCardsIds) !== JSON.stringify(currentDeckCardsIds);
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
