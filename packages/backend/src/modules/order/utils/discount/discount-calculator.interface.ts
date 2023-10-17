export interface DiscountCalculatorServiceInterface {
  calculate(order: Order, total: number): number;

  deleteDiscount(order: Order): void;

  sendEmail(order: Order): void;
}
