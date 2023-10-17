export class ValidOrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    // OCP : injection automatique des services qui implémentent l'interface DiscountCalculatorServiceInterface
    // permet d'ajouter des réductions, sans avoir à modifier cette classe
    private readonly discountCalculatorServices: DiscountCalculatorServiceInterface[],
  ) {}

  validOrder(orderId: number): Order {
    const order = this.orderRepository.findOne(orderId);

    let total = 0;

    order.products.forEach((product) => {
      total += product.price;
    });

    this.discountCalculatorServices.forEach((discountCalculatorService) => {
      total = discountCalculatorService.calculate(order, total);
    });

    order.total = total;
    order.status = 'completed';

    return order;
  }
}
