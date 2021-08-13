import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from './_models/drink';
import {Coin} from './_models/coin';
import {DrinksService} from './_services/drinks.service';
import {CoinsService} from './_services/coins.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  drinks: Drink[];
  balance: number;
  coins: Coin[];
  ngUnsubscribe$ = new Subject();

  constructor(
    private http: HttpClient,
    private drinksService: DrinksService,
    private coinsService: CoinsService) {
  }

  ngOnInit(): void {
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
    this.drinksService.fetchDrinks().pipe(takeUntil(this.ngUnsubscribe$)).subscribe(drinks => {
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
