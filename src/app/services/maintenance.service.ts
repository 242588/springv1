// src/app/services/maintenance.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maintenance } from 'app/models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  router: any;
  
  private baseUrl = 'http://localhost:8081/api/maintenances'; // Assure-toi que l'URL soit correcte sans apostrophes

  constructor(private http: HttpClient) {}

  ajouterM(maintenance: any): Observable<any> {
    if (!maintenance.machine || !maintenance.technicien) {
      console.error("Machine ou Technicien manquant !");
      return;
    }
    return this.http.post<any>(this.baseUrl, maintenance);
  }
  

  deleteMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  supprimerMaintenance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getMaintenances(): Observable<Maintenance[]> {
    return this.http.get<Maintenance[]>(this.baseUrl);
  }

  getMaintenanceById(id: number): Observable<Maintenance> {
    return this.http.get<Maintenance>(`${this.baseUrl}/${id}`);
  }

  updateMaintenance(id: number, maintenance: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, maintenance);
  }



  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  update(id: number, maintenance: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, maintenance);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
