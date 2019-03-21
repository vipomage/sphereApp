import { Injectable } from '@angular/core';
import { Sphere } from './sphere';

@Injectable({
  providedIn: 'root'
})
export class SphereService {
  private spheres: Sphere[] = [];
  // Returns a random number between 0 - (max) is exclusive
  static getRandomNum = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));
  // Generates 7 Spheres with one random with extra weight
  generateSpheres = (): Sphere[] => {
    if (this.spheres) {
      this.spheres = [];
    }
    const randomNum: number = SphereService.getRandomNum(7);
    for (let i = 0; i < 7; i++) {
      if (i === randomNum) {
        this.spheres.push(new Sphere(1.1));
      } else {
        this.spheres.push(new Sphere(1));
      }
    }
    return this.spheres;
  };
}
