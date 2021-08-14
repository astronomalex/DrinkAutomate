import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateUrlFromBlobService {

  public get(data): string {
    return URL.createObjectURL(data);
  }
}
