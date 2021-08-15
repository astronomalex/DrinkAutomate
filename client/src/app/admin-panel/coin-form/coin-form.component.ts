import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Coin} from '../../_models/coin';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {take, takeUntil} from 'rxjs/operators';
import {Drink} from '../../_models/drink';
import {SaveCoinDto} from '../../_models/save-coin-dto';

@Component({
  selector: 'app-coin-form',
  templateUrl: './coin-form.component.html',
  styleUrls: ['./coin-form.component.css']
})
export class CoinFormComponent implements OnInit {
  @Input() coins: Coin[] = [];
  coinForm: FormGroup;
  coinFormArray = new FormArray([]);
  coinControls: FormGroup;
  @Output() saveCoinsEmitter = new EventEmitter<SaveCoinDto[]>();

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    for (const coin of this.coins) {
      this.coinFormArray.push(new FormGroup({
        value: new FormControl(coin.value),
        quantity: new FormControl(coin.quantity),
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
    // return {
    //   value: this.coinFormArray.get('name').value,
    //   price: this.drinkFormControl.get('price').value,
    //   quantity: this.drinkFormControl.get('quantity').value,
    //   picture: this.drinkFormControl.get('picture').value,
    // };
  }
}
