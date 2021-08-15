import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drink} from '../../_models/drink';
import {DrinksService} from '../../_services/drinks.service';
import {take} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateUrlFromBlobService} from '../../_services/create-url-from-blob.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-drink-item',
  templateUrl: './admin-drink-item.component.html',
  styleUrls: ['./admin-drink-item.component.css']
})
export class AdminDrinkItemComponent implements OnInit {
  @Input() drink: Drink;
  @Output() reloadEmitter = new EventEmitter();
  picture: File;
  picUrl: SafeUrl;
  // drinkForm: FormGroup;
  public image;
  @Input() index: number;
  @Output() public removed: EventEmitter<number> = new EventEmitter<number>();
  @Input() drinkItemFormGroup: FormGroup;


  constructor(
    private drinksService: DrinksService,
    private createUrlFromBlob: CreateUrlFromBlobService,
    private sanitiser: DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.initForm();
    // this.picUrl = this.createUrlFromBlob.get(this.drink.picture);
  }

  // updateDrink(): void {
  //   this.drinksService.updateDrink(this.drink).pipe(take(1)).subscribe(drink => {
  //     console.log(drink);
  //   });
  // }

  // initForm(): void {
  //   let picture: number[] = [] ;
  //   this.drinkForm = new FormGroup({
  //     name: new FormControl(this.drink.name, Validators.required),
  //     price: new FormControl(this.drink.price, Validators.required),
  //     quantity: new FormControl(this.drink.quantity, Validators.required)
  //   });
  // }

  selectPicture(picture): void {
    this.picture = picture;
    this.picUrl = this.sanitiser.bypassSecurityTrustUrl(this.createUrlFromBlob.get(picture));
    console.log(this.picUrl);
  }

  // onSubmit(): void {
  //   this.drinksService.updateDrink(this.drink, this.picture).pipe(take(1)).subscribe(drink => {
  //     if (drink) {
  //       this.reloadEmitter.emit();
  //     }
  //   });
  // }

  onDelete(): void {
    this.drinksService.deleteDrink(this.drink.id).pipe(take(1)).subscribe(() => {
      this.reloadEmitter.emit();
    });
  }
}
