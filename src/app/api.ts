import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';

// An interface matching the structure of the JSON data from the backend
export interface Car {
  carId?: number;
  numberOfWheels: number;
  color: string;
  brand: string;
}

/**
 * Shared helper to normalize backend error payloads into a user-facing message.
 * Import and use in components: `import { extractErrorMessage } from './api';`
 */
// typescript
export function extractErrorMessage(error: any): string {
  const payload = error?.error ?? error;
  if (!payload) return 'Unknown error';
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') {
    if ('message' in payload && typeof payload.message === 'string') return payload.message;
    const vals = Object.values(payload).filter(v => v != null).map(v => String(v));
    return vals.length ? vals.join(';<br/> ') : JSON.stringify(payload);
  }
  return String(payload);
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
    return this.http.post<Car>(this.backendUrl, car);
  }

  deleteCar(carId: number): Observable<Car> {
    return this.http.delete<Car>(`${this.backendUrl}/id/${carId}`);
  }

  updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.backendUrl}/id/${car.carId}`, car);
  }

}
