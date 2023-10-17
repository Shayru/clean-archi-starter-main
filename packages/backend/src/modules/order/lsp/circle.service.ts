export default class CircleShapeCalculatorService extends ShapeService {
  calculateSize(shape: Shape): number {
    return Math.PI * Math.pow(shape.radius, 2);
  }
}
