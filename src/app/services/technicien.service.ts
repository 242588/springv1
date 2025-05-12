import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Machine {
    id?: number;
    nom: string;
    maintenanceProchaine: string;
    [key: string]: any; // pour accepter "état" avec accent
  }

export interface Technicien {
  id: number;
  nom: string;
  competences: string;
  machineAssignee: Machine;
}

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  ajouterTechnicien(technicien: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/techniciens', technicien);
  }
  private apiUrl = 'http://localhost:8081/api/techniciens';

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer tous les techniciens
  getAllTechniciens(): Observable<Technicien[]> {
    return this.http.get<Technicien[]>(this.apiUrl);
  }

  // 🔹 Supprimer un technicien par ID
  deleteTechnicien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer un technicien par ID (pour modification)
  getTechnicienById(id: number): Observable<Technicien> {
    return this.http.get<Technicien>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Mettre à jour un technicien
  updateTechnicien(id: number, technicien: Technicien): Observable<Technicien> {
    return this.http.put<Technicien>(`${this.apiUrl}/${id}`, technicien);
  }

  // 🔹 Ajouter un nouveau technicien
  addTechnicien(technicien: Technicien): Observable<Technicien> {
    return this.http.post<Technicien>(this.apiUrl, technicien);
  }

  
}
