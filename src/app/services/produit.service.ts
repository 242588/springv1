import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from 'app/models/produit.model';
import { FormsModule } from '@angular/forms';  // ✅ Ajouté ici
import { NgModule } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
 // Méthode pour ajouter un produit
 addProduit(produit: Produit): Observable<Produit> {
  return this.http.post<Produit>(this.apiUrl, produit);
}
  private apiUrl = 'http://localhost:8081/api/produits';
  produitService: any;
  router: any;

  constructor(private http: HttpClient) {}

  getProduits(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProduitById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  ajouterProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}`, produit);
  }

  modifierProduit(): void {
    console.log('Modification en cours', this.produit);  // Ajoutez un log pour vérifier les données avant la modification
    this.produitService.updateProduit(this.produit, this.produit).subscribe({
      next: () => {
        console.log('Produit modifié avec succès');
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        console.error('Erreur modification', err);
      }
    });
  }
  produit(arg0: string, produit: any) {
    throw new Error('Method not implemented.');
  }

  supprimerProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }
}
