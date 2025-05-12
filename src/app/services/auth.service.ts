import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  isAuthenticated(): boolean {
    // Vérifiez si le token est présent et valide
    const token = localStorage.getItem('authToken');
    return !!token; // Si un token est trouvé, l'utilisateur est authentifié
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Supprimer le token lors de la déconnexion
  }
}
