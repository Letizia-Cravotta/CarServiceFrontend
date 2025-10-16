import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// An interface matching the structure of the JSON data from the backend
export interface Car {
  carId?: number;
  numberOfWheels: number;
  color: string;
  brand: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient); // Modern dependency injection
  private backendUrl = 'http://localhost:8080/car';

  // This method returns an Observable stream of data
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.backendUrl);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.backendUrl, car, { responseType: 'json' });
  }
}
