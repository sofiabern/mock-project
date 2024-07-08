import { Routes } from '@angular/router';


import { HomeComponent } from './components/pages/home/home.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import { CheckInsBookingsComponent } from './components/pages/check-ins-bookings/check-ins-bookings.component';
import { ClientsComponent } from './components/pages/clients/clients.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'rooms', component: RoomsComponent},
    {path: 'check-ins-bookings', component: CheckInsBookingsComponent},
    {path: 'clients', component: ClientsComponent},
    {path: '**', component: PageNotFoundComponent},

];
