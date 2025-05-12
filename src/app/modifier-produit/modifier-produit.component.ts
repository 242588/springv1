import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from 'app/models/produit.model';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
})
export class ModifierProduitComponent implements OnInit {
  produitId!: number;
  produit: Produit = {
    id: 0,
    nom: '',
    type: '',
    stock: 0,
    fournisseur: ''
  };

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.produitId = +this.route.snapshot.paramMap.get('id')!;
    this.produitService.getProduitById(this.produitId).subscribe({
      next: (data) => (this.produit = data),
      error: (err) => console.error('Erreur chargement produit', err)
    });
  }

  modifierProduit(): void {
    this.produitService.updateProduit(this.produitId, this.produit).subscribe({
      next: () => this.router.navigate(['/produits']),
      error: (err) => console.error('Erreur modification', err)
    });
  }
}
