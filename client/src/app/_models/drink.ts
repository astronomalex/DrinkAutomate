import {Guid} from 'guid-typescript';

export interface Drink{
  id: Guid;
  name: string;
  price: number;
  picture: string;
  quantity: number;
}
