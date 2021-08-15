import {Component, OnDestroy, OnInit} from '@angular/core';
import {Drink} from '../_models/drink';
import {MatDialog} from '@angular/material/dialog';
import {DrinksService} from '../_services/drinks.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Coin} from '../_models/coin';
import {CoinsService} from '../_services/coins.service';
import {Guid} from 'guid-typescript';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  drinks: Drink[];
  balance: number;
  coins: Coin[];
  ngUnsubscribe$ = new Subject();
  adminForm: FormGroup;
  drinksFormArray: FormArray;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private drinksService: DrinksService,
    private coinsService: CoinsService
  ) {
  }

  ngOnInit(): void {
    this.updateInfo();

  }

  initForm(): void {
    this.drinksFormArray = new FormArray([]);
    for (const drink of this.drinks) {
      this.drinksFormArray.push(new FormGroup({
        name: new FormControl(drink.name, [Validators.required]),
        price: new FormControl(drink.price, [Validators.required, Validators.min(0), Validators.max(1000)]),
        quantity: new FormControl(drink.quantity, [Validators.required, Validators.min(0), Validators.max(100)])
      }));
    }

    this.adminForm = this.fb.group({
      drinkItems: this.drinksFormArray
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  loger(i): void {
    console.log(i);
  }

  updateInfo(): void {
    this.drinksService.getDrinks().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(drinks => {
      this.drinks = drinks;
    });
    this.coinsService.getCoins().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(coins => {
      this.coins = coins;
    });
    this.coinsService.getBalance().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(balance => {
      this.balance = balance;
    });
  }

  saveCoins(event): void {
    this.coinsService.saveCoinsOnBase(event).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(result => {
      this.updateInfo();
    });
  }

  // newDrink(): void {
  //   this.drinksService.addDrink({quantity: 0, price: 0, name: '', picture: []}).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(result => {
  //     this.updateInfo();
  //   });
  // }

  submit(): void {

  }
}
