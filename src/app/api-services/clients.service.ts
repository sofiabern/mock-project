import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, RoomApiResponse } from '../components/pages/clients/client.types';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = 'https://mock-beckend.onrender.com';

  constructor(private http: HttpClient) { }

  getClients(): Observable<RoomApiResponse> {
    return this.http.get<RoomApiResponse>(`${this.apiUrl}/clients`);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  getClientVisits(passportDetails: { passport_details: string }) :Observable<{ data: number }>{
    return this.http.post<{ data: number }>(`${this.apiUrl}/clients/visits`, passportDetails)
  }
}
