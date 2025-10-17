import { Component, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from './api';
import {CarViewer} from './car-viewer/car-viewer'; // The Message interface is now imported from the service
import {CreateCar} from './create-car/create-car';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarViewer, CreateCar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
    @ViewChild(CarViewer) carViewer!: CarViewer;

    onCarCreated(): void {
        // Refresh the car list when a new car is created
      this.carViewer.refreshCars();
    }
}
