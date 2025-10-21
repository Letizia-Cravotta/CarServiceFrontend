import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService, Car, extractErrorMessage } from '../api';
import { Subject, of } from 'rxjs';
import { startWith, switchMap, tap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CarEditor } from '../car-editor/car-editor';

@Component({
  selector: 'car-viewer',
  standalone: true,
  imports: [CommonModule, CarEditor], // Add CommonModule and CarEditor
  templateUrl: './car-viewer.html',
  styleUrls: ['./car-viewer.css']
})
export class CarViewer {
  title = 'My Car Collection';
  private apiService = inject(ApiService);

  error = signal<string | null>(null);

  private refresh$ = new Subject<void>();

  backendCars = toSignal(
    this.refresh$.pipe(
      startWith(undefined),
      // clear previous error when we attempt a refresh
      tap(() => this.error.set(null)),
      switchMap(() =>
        this.apiService.getAllCars().pipe(
          // clear error on successful response
          tap(() => this.error.set(null)),
          // on error, set a user-friendly message and return an empty array so the UI clears
          catchError((err: any) => {
            this.error.set(extractErrorMessage(err));
            return of([] as Car[]);
          })
        )
      )
    ),
    {initialValue: [] }
  );

  // State for managing the edit modal
  isEditing = false;
  carToEdit: Car | null = null;

  openEditModal(car: Car): void {
    this.carToEdit = car;
    this.isEditing = true;
  }

  closeEditModal(): void {
    this.isEditing = false;
    this.carToEdit = null;
  }

  handleCarUpdated(): void {
    this.refreshCars();
    this.closeEditModal();
  }

  refreshCars(): void {
    this.refresh$.next();
  }

  deleteCar(id: number): void {
    this.apiService.deleteCar(id).subscribe({
      next: () => {
        console.log(`Car with id ${id} deleted successfully`);
        this.refreshCars();
      },
      error: (err) => console.error('Error deleting car:', err)
    });
  }
}
