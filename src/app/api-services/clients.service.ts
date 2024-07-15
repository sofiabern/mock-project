import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Types
import { ClientsApiResponse, VisitsApiResponse, PassportDetails } from '../components/pages/clients/client.types';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }

  getClients(): Observable<ClientsApiResponse> {
    return this.http.get<ClientsApiResponse>(`${this.apiUrl}/clients`);
  }

  getClientVisits(passportDetails: PassportDetails): Observable<VisitsApiResponse> {
    return this.http.post<VisitsApiResponse>(`${this.apiUrl}/clients/visits`, passportDetails)
  }
}
