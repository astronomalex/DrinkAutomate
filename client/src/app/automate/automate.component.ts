import {Component, OnDestroy, OnInit} from '@angular/core';
import {Drink} from '../_models/drink';
import {Coin} from '../_models/coin';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {DrinksService} from '../_services/drinks.service';
import {CoinsService} from '../_services/coins.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-automate',
  templateUrl: './automate.component.html',
  styleUrls: ['./automate.component.css']
})
export class AutomateComponent implements OnInit, OnDestroy {
  params: any;
  drinks: Drink[];
  balance: number;
  coins: Coin[];
  ngUnsubscribe$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private drinksService: DrinksService,
    private coinsService: CoinsService) {
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(params => {
      console.log(params);
    });
    this.updateInfo();
  }

  addCoin(value: number): void {
    this.coinsService.insertCoin(value).pipe(takeUntil(this.ngUnsubscribe$)).subscribe(balance => {
      this.balance = balance;
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getCoinActive(value: number): boolean {
    if (this.coins === undefined) {
      return false;
    }
    return this.coins.find(c => c.value === value).active;
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
}
