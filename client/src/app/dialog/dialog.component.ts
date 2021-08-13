import {Component, Inject, OnInit, Output} from '@angular/core';
import * as EventEmitter from 'events';
import {Drink} from '../_models/drink';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PurchaseInfo} from '../_models/purchase-info';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  drink: Drink;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurchaseInfo
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
