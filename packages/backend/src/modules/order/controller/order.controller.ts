import { Controller, Post } from '@nestjs/common';
import { AddProductToCartService } from '@src/modules/order/use-case/addProductToCart.service';

@Controller('/order')
export default class ProductToCartAdder {
  constructor(private readonly addProductToCartService: AddProductToCartService) {}

  @Post()
  async addProductToCart(productId: number, orderId: number, productQuantity: number): Promise<Order> {
    const orderFromDb = await this.getOrderFromDB(orderId);

    const productFromDb = await this.getProductFromDb(productId);

    if (productQuantity > this.maxProductsInOrder) {
      throw new Exception(ExceptionTypeEnum.BadRequest, `You can not order more than ${this.maxProductsInOrder} products`);
    }

    if (productFromDb.quantityMax < productQuantity) {
      throw new Exception(ExceptionTypeEnum.BadRequest, 'Not enough products in stock');
    }

    const order = await this.saveProductInOrder(productQuantity, productFromDb, orderFromDb);

    this.emailSenderService.sendEmail(productFromDb);

    return order;
  }

  private async getProductFromDb(productId: number) {
    const productFromDb = await this.productRepository.find({ id: productId });

    if (!productFromDb) {
      throw new Exception(ExceptionTypeEnum.NotFound, 'Product not found');
    }
    return productFromDb;
  }

  private async getOrderFromDB(orderId: number) {
    const orderFromDb = await this.orderRepository.find({ id: orderId });

    if (!orderFromDb) {
      throw new Exception(ExceptionTypeEnum.NotFound, 'Order not found');
    }
    return orderFromDb;
  }

  private async saveProductInOrder(productQuantity: number, productFromDb: Product, orderFromDb: Order): Promise<Order> {
    productFromDb.quantity -= productQuantity;
    orderFromDb.products.push(productFromDb);
    return await this.orderRepository.save(orderFromDb);
  }
}
