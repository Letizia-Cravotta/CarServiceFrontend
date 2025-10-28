import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarViewer } from './car-viewer/car-viewer';
import { CreateCar } from './create-car/create-car';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'car-collection',
  standalone: true,
  imports: [CommonModule, CarViewer, CreateCar, RouterModule],
  templateUrl: './car-collection.html',
  styleUrls: ['./car-collection.css']
})
export class CarCollection {
  @ViewChild(CarViewer) carViewer!: CarViewer;

  // Called from the template `(carCreated)="onCarCreated()"`
  onCarCreated(): void {
    // Defensive call in case ViewChild isn't ready yet
    this.carViewer?.refreshCars();
  }
}
