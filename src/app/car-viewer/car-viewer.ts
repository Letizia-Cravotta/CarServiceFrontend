import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ApiService, Car} from '../api'; // The Message interface is now imported from the service
import {Subject, startWith, switchMap} from 'rxjs';

@Component({
  selector: 'car-viewer',
  standalone: true,
  imports: [],
  templateUrl: './car-viewer.html',
  styleUrls: ['./car-viewer.css']
})
export class CarViewer {
  title = 'My Angular 20 App';
  private apiService = inject(ApiService);

  private refresh$ = new Subject<void>();

  // The signal will now hold an array of Message objects.
  // The initial value is an empty array, which is perfect for our template.
  backendCars = toSignal(
    this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.getAllCars())
    ),
    {initialValue: []}
  );

  refreshCars(): void {
    this.refresh$.next();
  }

  deleteCar(id: number): void {
    this.apiService.deleteCar(id).subscribe({
      next: (deletedCar: Car) => {
        console.log(`Car with id ${id} deleted successfully`);
        this.refreshCars(); // Refresh the car list after deletion
      },
      error: (err) => console.error('Error deleting car:', err)
    });

  }
}
