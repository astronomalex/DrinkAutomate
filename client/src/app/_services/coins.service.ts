import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Coin} from '../_models/coin';
import {SaveCoinDto} from '../_models/save-coin-dto';

@Injectable({
  providedIn: 'root'
})
export class CoinsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  insertCoin(value: number): Observable<number> {
    return this.http.put<number>(this.baseUrl + 'coin/insert/' + value, {});
  }

  getBalance(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'coin/balance');
  }

  getCoins(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.baseUrl + 'coin');
  }

  saveCoinsOnBase(saveCoinDtos: SaveCoinDto[]): Observable<number> {
    return this.http.post<number>(this.baseUrl + 'coin/save', saveCoinDtos);
  }

}
