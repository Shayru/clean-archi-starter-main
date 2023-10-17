import { DiscountCalculatorServiceInterface } from '@src/modules/order/utils/discount/discount-calculator.interface';

export class DiscountCalculatorByJeanPierreService implements DiscountCalculatorServiceInterface {
  calculate(order: Order, total: number): number {
    if (order.user.name === 'Jean Pierre') {
      total = total * 0.5;
    }

    return total;
  }

  deleteDiscount(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      order.discount = 0;
    }
  }

  sendEmail(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      console.log('Sending email to Jean Pierre');
    }
  }
}
