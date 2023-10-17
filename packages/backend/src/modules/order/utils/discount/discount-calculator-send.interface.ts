export interface DiscountCalculatorSendServiceInterface {
  sendEmail(order: Order): void {
    if (order.user.name === 'Jean Pierre') {
      console.log('Sending email to Jean Pierre');
    }
  }
}
