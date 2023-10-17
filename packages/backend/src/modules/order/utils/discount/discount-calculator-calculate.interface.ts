export interface DiscountCalculatorCalculteServiceInterface {
  calculate(order: Order, total: number): number;
}
