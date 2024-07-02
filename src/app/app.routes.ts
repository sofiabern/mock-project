import { Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CheckInsBookingsComponent } from './check-ins-bookings/check-ins-bookings.component';
import { ClientsComponent } from './clients/clients.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'rooms', component: RoomsComponent},
    {path: 'check-ins-bookings', component: CheckInsBookingsComponent},
    {path: 'clients', component: ClientsComponent},

];
