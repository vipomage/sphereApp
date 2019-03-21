/* tslint:disable:no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import { SphereService } from './sphere-service.service';
import { Result, Scales } from './scales';
import { Sphere } from './sphere';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public spheres: Sphere[];
  public scales: Scales;
  public output: string;
  public actions: string[];

  constructor(private sphereService: SphereService) {}

  public find = () => {
    this.actions = [];
    this.logAction('Generating Random 7 Spheres!');
    this.spheres = this.sphereService.generateSpheres();
    this.logAction('Instantiating Scales');
    this.scales = new Scales();
    this.logAction('Splitting random spheres set into two [1,2,3] [4,5,6]');
    let leftNRightSubSets = {
      ['left']: this.spheres.slice(0, 3),
      ['right']: this.spheres.slice(3, 6)
    };
    this.logAction('Comparing Left and Right subset');
    let result = this.scales.compareSides(
      leftNRightSubSets.left,
      leftNRightSubSets.right
    );
    if (result !== Result.Equal) {
      this.logAction(`${Result[result]} side is heavier`);
      if (result === Result.Left) {
        this.logAction('Comparing left side spheres [1,2,3]');
        this.output = this.findBetweenThree(leftNRightSubSets.left);
      } else {
        this.output = this.findBetweenThree(leftNRightSubSets.right, true);
      }
    } else {
      this.output =
        'They are Equal therefore sphere number 7 is the special one';
    }
  };

  // Never in my life i hated a function this much
  private logAction = (action: string): void => {
    this.actions.push(action);
  };
  // Compares given subset of triplets and returns the heaviest among them
  private findBetweenThree = (
    sphereTriplet: Sphere[],
    rightSide?: boolean
  ): string => {
    const left = sphereTriplet[0];
    const right = sphereTriplet[1];
    let heaviestOrderNo;
    this.logAction(
      `Comparing sphere ${rightSide ? '4' : '1'} to ${rightSide ? '5' : '2'}`
    );
    const result = this.scales.compareSides(left, right);
    if (result === Result.Equal) {
      this.logAction('They are equal');
      heaviestOrderNo = 3;
    } else {
      if (result === Result.Left) {
        heaviestOrderNo = 1;
      } else {
        heaviestOrderNo = 2;
      }
    }
    return `Sphere number ${
      rightSide ? heaviestOrderNo + 3 : heaviestOrderNo
    } is heaviest!`;
  };

  ngOnInit(): void {}
}
