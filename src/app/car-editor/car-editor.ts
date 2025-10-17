import {Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ApiService, Car, extractErrorMessage} from '../api';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'car-editor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './car-editor.html',
  styleUrls: ['./car-editor.css']
})
export class CarEditor implements OnChanges {
  @Input() car: Car | null = null;
  @Output() carUpdated = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private apiService = inject(ApiService);
  // Create a local copy for editing to avoid changing the original object directly.
  editableCar: Car = {brand: '', color: '', numberOfWheels: 4};

  error = signal<string | null>(null);

  ngOnChanges(changes: SimpleChanges): void {
    // When the input car changes, clone it to `editableCar`.
    if (changes['car'] && this.car) {
      this.editableCar = {...this.car};
      this.error.set(null)
    }
  }

  onSubmit(): void {
    if (this.editableCar.carId) {
      this.apiService.updateCar(this.editableCar).subscribe({
        next: () => {
          console.log('Car updated successfully');
          this.carUpdated.emit(); // Notify parent that update was successful.
          this.error.set(null)
          this.close.emit(); // Close the modal.
        },
        error: (err) => {
          const msg = extractErrorMessage(err);
          this.error.set(msg);
          console.error('Error updating car:', err)
        }
      });
    }
  }

  closeModal(): void {
    this.error.set(null);
    this.close.emit();
  }
}
