import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../_models/coin';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {SaveCoinDto} from '../../_models/save-coin-dto';

@Component({
  selector: 'app-coin-form',
  templateUrl: './admin-coin.component.html',
  styleUrls: ['./admin-coin.component.css']
})
export class AdminCoinComponent implements OnInit {
  @Input() coins: Coin[] = [];
  coinForm: FormGroup;
  coinFormArray = new FormArray([]);
  coinControls: FormGroup;
  @Output() saveCoinsEmitter = new EventEmitter<SaveCoinDto[]>();

  constructor() {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    for (const coin of this.coins) {
      this.coinFormArray.push(new FormGroup({
        value: new FormControl(coin.value),
        quantity: new FormControl(coin.quantity, [Validators.required, Validators.max(10000), Validators.min(0)]),
        active: new FormControl(coin.active)
      }));
    }
    this.coinForm = new FormGroup({
      coinFormArray: this.coinFormArray
    });
  }

  getControlsCoins(): AbstractControl[] {
    return (this.coinForm.get('coinFormArray') as FormArray).controls;
  }

  saveCoins(): void {
    this.saveCoinsEmitter.emit(this.getCoinDtosFromForm());
  }

  public getCoinDtosFromForm(): SaveCoinDto[] {
    const coinDtos: SaveCoinDto[] = [];
    for (const control of this.getControlsCoins()) {
      coinDtos.push({value: control.value.value, quantity: control.value.quantity, active: control.value.active});
    }
    return coinDtos;
  }
}
