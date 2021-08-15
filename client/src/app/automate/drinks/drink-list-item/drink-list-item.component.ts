import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Drink} from '../../../_models/drink';

@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-list-item.component.html',
  styleUrls: ['./drink-list-item.component.css']
})
export class DrinkListItemComponent implements OnInit {
  @Input() balance: number;
  @Input() drink: Drink;
  @Output() buyDrinkEvent = new EventEmitter<Drink>();

  constructor() {
  }

  ngOnInit(): void {
  }

  buyDrink(): void {
    this.buyDrinkEvent.emit(this.drink);
  }
}
