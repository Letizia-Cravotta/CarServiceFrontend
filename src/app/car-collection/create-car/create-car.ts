import {Component, Output, EventEmitter, signal} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ApiService, Car, extractErrorMessage} from '../../api';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'create-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-car.html',
  styleUrls: ['./create-car.css']
})
export class CreateCar {
  @Output() carCreated = new EventEmitter<void>();
  car: Car = {numberOfWheels: 4, color: 'green', brand: 'Toyota'};

  constructor(private apiService: ApiService) {
  }

  error = signal<string | null>(null);

  onSubmit():void {
    this.apiService.createCar(this.car).subscribe({
      next: (createdCar: Car) => {
        this.carCreated.emit();
        console.log('Car created successfully');
      },
      error: (err) => {
        const msg = extractErrorMessage(err);
        this.error.set(msg);
        console.error('Error creating car:', err)
      }
    });
  }
}
