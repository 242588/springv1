import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Machine {
  id?: number;
  nom: string;
  maintenanceProchaine: string;
  [key: string]: any; // pour accepter "état" avec accent
}


@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private apiUrl = 'http://localhost:8081/api/machines';

  constructor(private http: HttpClient) {}

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.apiUrl);
  }

  getMachineById(id: number) {
    return this.http.get<Machine>(`${this.apiUrl}/${id}`);
  }
  
  addMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.apiUrl, machine);
  }

  updateMachine(id: number, machine: Machine): Observable<Machine> {
    return this.http.put<Machine>(`${this.apiUrl}/${id}`, machine);
  }

  deleteMachine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  supprimerMachine(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/machines/${id}`);
  }
  ajouterMachine(machine: Machine): Observable<Machine> {
  return this.http.post<Machine>(this.apiUrl, machine);
}
  
}
