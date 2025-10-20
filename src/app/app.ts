import { Component} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from './api';
import { CarViewer } from './car-collection/car-viewer/car-viewer';
import { CreateCar } from './car-collection/create-car/create-car';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

}
