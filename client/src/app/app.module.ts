import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DrinkListItemComponent} from './automate/drinks/drink-list-item/drink-list-item.component';
import {DrinkListComponent} from './automate/drinks/drink-list/drink-list.component';
import {DialogComponent} from './automate/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {AutomateComponent} from './automate/automate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AdminDrinkListComponent} from './admin-panel/admin-drink-list/admin-drink-list.component';
import {AdminDrinkListItemComponent} from './admin-panel/admin-drink-list-item/admin-drink-list-item.component';
import {MatCardModule} from '@angular/material/card';
import {AdminAddDrinkDialogComponent} from './admin-panel/admin-add-drink-dialog/admin-add-drink-dialog.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AdminCoinComponent} from './admin-panel/admin-coin/admin-coin.component';

@NgModule({
  declarations: [
    AppComponent,
    DrinkListItemComponent,
    DrinkListComponent,
    DialogComponent,
    AdminPanelComponent,
    AutomateComponent,
    AdminDrinkListComponent,
    AdminDrinkListItemComponent,
    AdminAddDrinkDialogComponent,
    AdminCoinComponent
  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
