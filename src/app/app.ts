import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from './api';
import {CarViewer} from './car-viewer/car-viewer'; // The Message interface is now imported from the service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarViewer],
  templateUrl: './app.html',
})
export class App {

}
