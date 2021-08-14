import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrinkCardComponent } from './drinks/drink-card/drink-card.component';
import { DrinkListComponent } from './drinks/drink-list/drink-list.component';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AutomateComponent } from './automate/automate.component';
import { AdminDrinkItemComponent } from './admin-panel/admin-drink-item/admin-drink-item.component';
import { DrinkEditComponent } from './admin-panel/drink-edit/drink-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    DrinkCardComponent,
    DrinkListComponent,
    DialogComponent,
    AdminPanelComponent,
    AutomateComponent,
    AdminDrinkItemComponent,
    DrinkEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
