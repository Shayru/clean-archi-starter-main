export class ShapeCalculatorService {
  calculateSize(shape: Shape): number {
    return shape.width * shape.height;
  }
}
