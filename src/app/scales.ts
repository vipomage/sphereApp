import { Sphere } from './sphere';

export enum Result {
  Equal,
  Left,
  Right
}

export class Scales {
  private leftSideValue: number;
  private rightSideValue: number;

  //Compares given Sphere | Sphere[] (Left - Right) returns Result[Equal,Left,Right]
  public compareSides = (
    leftSide: Sphere[] | Sphere,
    rightSide: Sphere[] | Sphere
  ): Result => {
    this.leftSideValue = this.calcSum(leftSide);
    this.rightSideValue = this.calcSum(rightSide);

    if (this.leftSideValue !== this.rightSideValue) {
      return this.leftSideValue > this.rightSideValue
        ? Result.Left
        : Result.Right;
    }
    return Result.Equal;
  };

  // Sums the weight of given Sphere | Sphere[]
  private calcSum = (spheres: Sphere[] | Sphere): number => {
    return Array.isArray(spheres)
      ? spheres.reduce((prev, current) => prev + current.weight, 0)
      : spheres.weight;
  };
}
