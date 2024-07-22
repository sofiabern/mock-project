import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client, ClientsPaginationApiResponse } from './clients.types';
import { ClientsApiService } from '../../../api-services/clients.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private perPage: number = 6; // Default number of items per page
  private currentFilter: string = ''; // Current filter term

  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$ = this.clientsSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private paginationInfoSubject = new BehaviorSubject<any>({});
  paginationInfo$ = this.paginationInfoSubject.asObservable();

  constructor(private clientsApiService: ClientsApiService, private toastr: ToastrService) { }

  // Fetch clients with optional filtering and pagination
  fetchClients(page: number = 1, perPage: number = this.perPage, filter: string = this.currentFilter) {
    this.perPage = perPage; // Update items per page
    this.currentFilter = filter; // Update the filter
    this.loadingSubject.next(true);
    
    this.clientsApiService.getClients(page, perPage, filter).subscribe({
      next: (response: ClientsPaginationApiResponse) => {
        this.clientsSubject.next(response.data.clients);
        this.paginationInfoSubject.next({
          page: response.data.page,
          perPage: response.data.perPage,
          totalItems: response.data.totalItems,
          totalPages: response.data.totalPages,
          hasPreviousPage: response.data.hasPreviousPage,
          hasNextPage: response.data.hasNextPage
        });
      },
      error: (error) => {
        this.loadingSubject.next(false);
        console.error(error);
        this.toastr.error('Oops! Something went wrong while fetching clients.');
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    });
  }

   // Set the current filter term
   setFilter(filter: string) {
    this.currentFilter = filter;
  }

  // Get the current filter term
  getFilter(): string {
    return this.currentFilter;
  }

  // Get the current number of items per page
  getPerPage(): number {
    return this.perPage;
  }

  // Check if data is loading
  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
