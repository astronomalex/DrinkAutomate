import {Component, OnInit} from '@angular/core';
import {Drink} from '../../_models/drink';
import {DrinksService} from '../../_services/drinks.service';
import {first, take} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {AdminAddDrinkDialogComponent} from '../admin-add-drink-dialog/admin-add-drink-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-drink-list',
  templateUrl: './admin-drink-list.component.html',
  styleUrls: ['./admin-drink-list.component.css']
})
export class AdminDrinkListComponent implements OnInit {
  public drinkList: Drink[];

  constructor(public drinkService: DrinksService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
    drinkService.getDrinks().pipe(first())
      .subscribe(drinks => this.drinkList = drinks);
  }

  ngOnInit(): void {
  }

  public submitDrink($event): void {
    if ($event.id) {
      this.drinkService.updateDrink($event, $event.picture).pipe(take(1)).subscribe(drink => {
        this.snackBar.open('Успешно сохранен', 'Ok', {duration: 3000});
      });
    } else {
      this.drinkService.addDrink($event).pipe(take(1)).subscribe(drink => {
        this.snackBar.open('Успешно добавлен', 'Ok', {duration: 3000});
        this.drinkList.push(drink);
      });
    }
  }

  public deleteDrink($event): void {
    this.drinkService.deleteDrink($event).pipe(take(1)).subscribe(drink => {
      this.snackBar.open('Успешно удален', 'Ok', {duration: 3000});
      this.drinkList = this.drinkList.filter(item => item.id !== $event);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdminAddDrinkDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.submitDrink(result);
    });
  }

  public trackByFn(index: number, {id}): string {
    return id;
  }
}
