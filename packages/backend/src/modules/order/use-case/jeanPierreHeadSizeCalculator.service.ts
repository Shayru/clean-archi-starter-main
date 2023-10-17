import CircleShapeCalculatorService from '@src/modules/order/lsp/circle.service';
import { ShapeCalculatorService } from '@src/modules/order/lsp/shape.service';

export class JeanPierreHeadSizeCalculatorService {
  calculateHeadSize(head: Head): number {
    const shapeCalculatorService: ShapeCalculatorService = new CircleShapeCalculatorService();

    return shapeCalculatorService.calculateSize(head);
  }
}
