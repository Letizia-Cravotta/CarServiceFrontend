import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ApiService, Car} from '../api';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'create-car',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-car.html',
  styleUrls: ['./create-car.css']
})
export class CreateCar {
  car: Car = {carId: 22, numberOfWheels: 4, color: 'green', brand: 'Toyota'};

  constructor(private apiService: ApiService) {
  }

  onSubmit():void {
    this.apiService.createCar(this.car).subscribe({
      next: () => {
        console.log('Car created successfully');
        //this.router.navigate(['/cars']); // Navigate to the car list view after creation
      },
      error: (err) => console.error('Error creating car:', err)
    });
  }
}
