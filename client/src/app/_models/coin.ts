import {Guid} from 'guid-typescript';

export interface Coin{
  id: Guid;
  value: number;
  active: boolean;
  quantity: number;
}
