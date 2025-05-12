import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from 'app/models/produit.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
})
export class AjouterProduitComponent {
  produit: Produit = {
      nom: '',
      type: '',
      stock: 0,
      fournisseur: '',
      id: 0
  };

  constructor(private produitService: ProduitService, private router: Router) {}

  ajouterProduit() {
    const produitSansId = { ...this.produit };
delete produitSansId.id; // Supprime l'id s’il existe

this.produitService.ajouterProduit(produitSansId).subscribe({
  next: data => {
    console.log("Produit ajouté :", data);
    this.router.navigate(['/produits']);
  },
  error: err => {
    console.error("Erreur lors de l'ajout :", err);
  }
});
  }
}
