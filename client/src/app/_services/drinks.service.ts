import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../_models/drink';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Change} from '../_models/change';
import {Guid} from 'guid-typescript';
import {CreateDrinkDto} from '../_models/create-drink-dto';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.baseUrl + 'drinks');
  }

  addDrink(drinkDTO: CreateDrinkDto): Observable<Drink> {
    return this.http.post<Drink>(this.baseUrl + 'drinks', drinkDTO);
  }

  buyDrink(drink: Drink): Observable<Change[]> {
    return this.http.post<Change[]>(this.baseUrl + 'drinks/buy/' + drink.id, {});
  }

  updateDrink(drink: Drink, picture: File): Observable<Drink> {
    const content = new FormData();
    content.append('picture', picture);
    return this.http.put<Drink>(`${this.baseUrl}drinks?id=${encodeURIComponent(drink.id as any as string)}` +
    `&name=${encodeURIComponent(drink.name)}&quantity=${encodeURIComponent(drink.quantity.toString())}` +
    `&price=${encodeURIComponent(drink.price.toString())}`, content);
  }

  deleteDrink(id: Guid): Observable<any> {
    return this.http.delete(this.baseUrl + 'drinks/' + id);
  }
}
