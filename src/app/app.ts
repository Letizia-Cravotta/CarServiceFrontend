import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from './api'; // The Message interface is now imported from the service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
})
export class App {
  title = 'My Angular 20 App';
  private apiService = inject(ApiService);

  // The signal will now hold an array of Message objects.
  // The initial value is an empty array, which is perfect for our template.
  backendCars = toSignal(this.apiService.getAllCars(), { initialValue: [] });
}
