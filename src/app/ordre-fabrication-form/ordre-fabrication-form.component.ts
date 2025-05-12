import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrdreFabricationService } from '../services/ordre-fabrication.service';
import { MachineService } from 'app/services/machine.service';
import { ProduitService } from 'app/services/produit.service';

@Component({
  selector: 'app-ordre-fabrication-form',
  templateUrl: './ordre-fabrication-form.component.html',
  styleUrls: ['./ordre-fabrication-form.component.scss']
})
export class OrdreFabricationFormComponent {
  
  ordre = {
    produit: '',
    quantite: null,
    date: '',
    machine: '',
    statut: 'EN_COURS'
  };
machines: any;
produits: any[] = [];

  constructor(private ordreService: OrdreFabricationService, private router: Router,private machineService: MachineService, private produitService: ProduitService) {}

  onSubmit() {
    console.log("Données envoyées :", this.ordre); // 👈 Vérifie ce que tu envoies
    const ordreData = {
      produit: { id: this.ordre.produit },
      quantite: this.ordre.quantite,
      date: this.ordre.date,
      machine: { id: this.ordre.machine },
      statut: this.ordre.statut
    };
  
    this.ordreService.ajouterOrdre(ordreData).subscribe({
      next: (response) => {
        console.log('Ordre ajouté avec succès !', response);
        alert('Ordre ajouté avec succès !');
        this.router.navigate(['/typography']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de l\'ordre', error);
        alert('Erreur lors de l\'ajout de l\'ordre');
      }
    });
  }
  
  ngOnInit(): void {
    this.machineService.getMachines().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des machines", err);
      }
    });
    this.produitService.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error("Erreur produits :", err)
    });
  }
  

  annuler() {
    this.router.navigate(['/typography']);
  }
}
