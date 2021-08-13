import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Drink} from '../_models/drink';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Change} from '../_models/change';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  fetchDrinks(): Observable<Drink[]>{
    return this.http.get<Drink[]>(this.baseUrl + 'drinks');
  }

  buyDrink(drink: Drink): Observable<Change[]> {
    return this.http.post<Change[]>(this.baseUrl + 'drinks/buy/' + drink.id, {});
  }
}
