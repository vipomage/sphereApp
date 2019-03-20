import { Sphere } from './sphere';

enum Result {
  Equal,
  Left,
  Right
}

export class Scales {
  private readonly firstTriplet: Sphere[];
  private readonly secondTriplet: Sphere[];
  public actions: string[] = [];
  private result: Result;
  private output: string;

  private leftSideValue: number;
  private rightSideValue: number;

  constructor(firstTriplet: Sphere[], secondTriplet: Sphere[]) {
    this.firstTriplet = firstTriplet;
    this.secondTriplet = secondTriplet;
  }

  // Determines the heavy sphere among last three
  private findBetweenThree = (
    sphereTriplet: Sphere[],
    second?: boolean
  ): string => {
    const left = sphereTriplet[0].weight;
    const right = sphereTriplet[1].weight;
    let heaviestOrderNo;
    this.logAction(
      `Comparing ${second ? 'fourth' : 'first'} to ${
        second ? 'fifth' : 'second'
      }`
    );
    if (left === right) {
      this.logAction(
        `${second ? 'fourth' : 'first'} and ${
          second ? 'fifth' : 'second'
        } are equal!`
      );
      heaviestOrderNo = 3;
    } else {
      if (left > right) {
        this.logAction(`${second ? 'fourth' : 'first'} is heavier!`);
        heaviestOrderNo = 1;
      } else {
        this.logAction(`${second ? 'fifth' : 'second'} is heavier!`);
        heaviestOrderNo = 2;
      }
    }
    return `Sphere number ${
      second ? heaviestOrderNo + 3 : heaviestOrderNo
    } is heaviest!`;
  };

  // Calculates the sum of given subset Sphere[]
  private calcSum = (sphereArr: Sphere[]): number =>
    sphereArr.reduce((prev, current) => prev + current.weight, 0);

  // inserts given action to actions []
  private logAction = (action: string): void => {
    this.actions.push(action);
  };

  // Compares first subset of spheres[] to second subset of spheres[]
  public compareSides = (): string => {
    this.actions = [];
    this.leftSideValue = this.calcSum(this.firstTriplet);
    this.rightSideValue = this.calcSum(this.secondTriplet);

    this.logAction('Comparing [1,2,3] to [4,5,6]');

    if (this.leftSideValue === this.rightSideValue) {
      this.result = Result.Equal;
      this.logAction('Both sides are equal!');
    } else {
      if (this.leftSideValue > this.rightSideValue) {
        this.result = Result.Left;
        this.logAction('Left side is heavier');
      } else {
        this.result = Result.Right;
        this.logAction('Right side is heavier');
      }
    }
    if (this.result === Result.Equal) {
      this.output = 'Sphere number 7 is heaviest';
    } else if (this.result === Result.Left) {
      this.output = this.findBetweenThree(this.firstTriplet);
    } else if (this.result === Result.Right) {
      this.output = this.findBetweenThree(this.secondTriplet, true);
    }
    return this.output;
  };
}
