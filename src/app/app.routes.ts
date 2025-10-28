import { Routes } from '@angular/router';
import { CarCollection } from './car-collection/car-collection';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },        // show welcome on root
  { path: 'cars', component: CarCollection },
  { path: '**', redirectTo: '' }
];
