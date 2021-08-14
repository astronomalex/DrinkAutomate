import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from './_models/drink';
import {Coin} from './_models/coin';
import {DrinksService} from './_services/drinks.service';
import {CoinsService} from './_services/coins.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor() {
  }

  ngOnInit(): void {
  }
}
