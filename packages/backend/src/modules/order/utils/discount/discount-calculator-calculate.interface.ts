export interface DiscountCalculatorCalculteServiceInterface {
  calculate(order: Order, total: number): number {
    if (order.user.name === 'Jean Pierre') {
      total = total * 0.5;
    }

    return total;
  }
}
