import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {ApiService, Car} from '../api';
import {Subject, startWith, switchMap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {CarEditor} from '../car-editor/car-editor'; // Import CarEditor

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

  private refresh$ = new Subject<void>();

  backendCars = toSignal(
    this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.apiService.getAllCars())
    ),
    {initialValue: []}
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
