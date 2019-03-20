import { Injectable } from '@angular/core';
import { Sphere } from './sphere';

@Injectable({
  providedIn: 'root'
})
export class SphereServiceService {
  private spheres: Sphere[] = [];
  constructor() {}

  // Returns a random number between 0 - (max) is exclusive
  getRandomNum = (max): number => Math.floor(Math.random() * Math.floor(max));

  // Generates 7 Spheres with one random with extra weight
  generateSpheres = (): Sphere[] => {
    if (this.spheres) {
      this.spheres = [];
    }
    const randomNum: number = this.getRandomNum(7);
    for (let i = 0; i < 7; i++) {
      if (i === randomNum) {
        this.spheres.push({ weight: 1.1 });
      } else {
        this.spheres.push({ weight: 1 });
      }
    }
    return this.spheres;
  };
}
