import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drink} from '../../../_models/drink';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../dialog/dialog.component';
import {DrinksService} from '../../../_services/drinks.service';
import {take} from 'rxjs/operators';
import {PurchaseInfo} from '../../../_models/purchase-info';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit {
  @Input() balance: number;
  @Input() drinks: Drink[];
  @Output() buyDoneEvent = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private drinksService: DrinksService
  ) {
  }

  ngOnInit(): void {
  }

  buyDone(drink: Drink): void {
    console.log(drink);
    this.drinksService.buyDrink(drink).pipe(take(1)).subscribe(changes => {
      if (changes !== undefined) {
        this.showPurchaseInfo({drink, changes});
      }
    });
  }

  showPurchaseInfo(purchaseInfo: PurchaseInfo): void {
    this.buyDoneEvent.emit();
    this.dialog.open
    (DialogComponent, {
      data: purchaseInfo
    });
  }
}
