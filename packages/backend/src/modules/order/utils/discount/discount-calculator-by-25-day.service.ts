import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/discount/discount-calculator.interface';
import { DiscountCalculatorCalculteServiceInterface } from './discount-calculator-calculate.interface';

export class DiscountCalculatorBy25DayService implements DiscountCalculatorCalculteServiceInterface {
  calculate(order, total) {
    if (new Date('now') === '25') {
      total = total - 10;
    }
    return total;
  }
}
