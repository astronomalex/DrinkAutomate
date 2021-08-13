import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Drink} from '../../_models/drink';
@Component({
  selector: 'app-drink-card',
  templateUrl: './drink-card.component.html',
  styleUrls: ['./drink-card.component.css']
})
export class DrinkCardComponent implements OnInit {
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
