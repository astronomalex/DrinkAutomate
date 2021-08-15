import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drink} from '../../_models/drink';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DrinkCardComponent} from '../../drinks/drink-card/drink-card.component';
import {CreateUrlFromBlobService} from '../../_services/create-url-from-blob.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-drink-list-item',
  templateUrl: './admin-drink-list-item.component.html',
  styleUrls: ['./admin-drink-list-item.component.css']
})
export class AdminDrinkListItemComponent implements OnInit {
  @Input() set drink(value: Drink) {
    if (!value) {
      return;
    }
    this.type = 'edit';
    this.drinkFormControl.get('id').setValue(value.id);
    this.drinkFormControl.get('name').setValue(value.name);
    this.drinkFormControl.get('price').setValue(value.price);
    this.drinkFormControl.get('quantity').setValue(value.quantity);
    this.setImgUrl(value.picture);
  }

  @Output() submitDrink = new EventEmitter<Drink>();
  @Output() deleteDrink = new EventEmitter<string>();
  public imgSrc: SafeUrl;
  public type: 'add' | 'edit' = 'add';

  drinkFormControl = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    quantity: new FormControl('', [Validators.required, Validators.min(0)]),
    picture: new FormControl(''),
  });

  constructor(public createUrlFromBlobService: CreateUrlFromBlobService,
              public sanitiser: DomSanitizer) {
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    this.submitDrink.emit(this.getDrinkFromForm());
    this.drinkFormControl.markAsPristine();
    if (this.type === 'add') {
      this.drinkFormControl.reset();
    }
  }

  public onDelete(): void {
    this.deleteDrink.emit(this.drinkFormControl.get('id').value);
  }

  public getDrinkFromForm(): Drink {
    return {
      id: this.type === 'edit' ? this.drinkFormControl.get('id').value : undefined,
      name: this.drinkFormControl.get('name').value,
      price: this.drinkFormControl.get('price').value,
      quantity: this.drinkFormControl.get('quantity').value,
      picture: this.drinkFormControl.get('picture').value,
    };
  }

  selectPicture(picture): void {
    this.imgSrc = this.sanitiser.bypassSecurityTrustUrl(this.createUrlFromBlobService.get(picture));
    this.drinkFormControl.get('picture').setValue(picture);
    this.drinkFormControl.markAsDirty();
  }

  private setImgUrl(picture): void {
    const byteCharacters = atob(picture);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'image/jpeg'});
    const unSafe = this.createUrlFromBlobService.get(blob);
    this.imgSrc = this.sanitiser.bypassSecurityTrustUrl(unSafe);
  }
}
