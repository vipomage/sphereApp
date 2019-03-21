import { Sphere } from './sphere';

export enum Result {
  Equal,
  Left,
  Right
}

export class Scales {
  private leftSideValue: number;
  private rightSideValue: number;

  public compareSides = (leftSide: Sphere[] | Sphere, rightSide: Sphere[] | Sphere ): Result => {
    this.leftSideValue = this.calcSum(leftSide);
    this.rightSideValue = this.calcSum(rightSide);

    if (this.leftSideValue !== this.rightSideValue) {
      return this.leftSideValue > this.rightSideValue
        ? Result.Left
        : Result.Right;
    }
    return Result.Equal;
  };

  private calcSum = (...spheres): number =>
     spheres.reduce((prev, current) => prev + current.weight, 0);
}
