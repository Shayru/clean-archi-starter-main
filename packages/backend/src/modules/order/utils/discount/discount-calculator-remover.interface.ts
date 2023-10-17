export interface DiscountCalculatorRemoverServiceInterface {
  deleteDiscount(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      order.discount = 0;
    }
  }
}
