import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdreFabricationService {
  private apiUrl = 'http://localhost:8081/api/ordres';

  constructor(private http: HttpClient) {}

  // ✅ Méthode corrigée pour ajouter un ordre (retourne un Observable)
  ajouterOrdre(ordre: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ordre);
  }

  // ✅ Méthode corrigée pour supprimer un ordre (retourne un Observable)
  supprimerOrdre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Méthode pour récupérer les ordres
  getOrdresFabrication(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getOrdreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  

  // ✅ Modifier un ordre
  updateOrdre(id: number, ordre: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ordre);
  }
  // src/app/services/ordre-fabrication.service.ts
deleteOrdre(id: number) {
  return this.http.delete(`${this.apiUrl}/ordres/${id}`);
}
getAllOrdres() {
  return this.http.get<any[]>('http://localhost:8081/api/ordres');
}

}
