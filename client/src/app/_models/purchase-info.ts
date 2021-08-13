import {Drink} from './drink';
import {Change} from './change';

export interface PurchaseInfo {
  drink: Drink;
  changes: Change[];
}
