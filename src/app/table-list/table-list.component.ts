import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
})
export class TableListComponent implements OnInit {
  produits: any[] = [];

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
    });
  }

  modifierProduit(id: number): void {
    this.router.navigate(['/modifier-produit', id]);
  }

  supprimerProduit(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      this.produitService.supprimerProduit(id).subscribe(() => {
        this.chargerProduits(); // Rafraîchir la liste après suppression
      }, error => {
        console.error("Erreur lors de la suppression du produit :", error);
      });
    }
  }
}
