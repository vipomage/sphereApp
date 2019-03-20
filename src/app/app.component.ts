/* tslint:disable:no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import { SphereServiceService } from './sphere-service.service';
import { Scales } from './scales';
import { Sphere } from './sphere';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public spheres: Sphere[] = this.sphereService.generateSpheres();
  public scales: Scales = new Scales(
    this.spheres.slice(0, 3),
    this.spheres.slice(3, 6)
  );
  public result: string;

  constructor(private sphereService: SphereServiceService) {}

  public find = () => {
    if (this.result) {
      this.spheres = this.sphereService.generateSpheres();
      this.scales = new Scales(
        this.spheres.slice(0, 3),
        this.spheres.slice(3, 6)
      );
      this.result = this.scales.compareSides();
    }
    this.result = this.scales.compareSides();
  };

  ngOnInit(): void {}
}
