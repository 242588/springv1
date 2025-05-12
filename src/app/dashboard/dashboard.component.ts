import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Router } from '@angular/router';
import { OrdreFabricationService } from 'app/services/ordre-fabrication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ordres: any[] = [];
  produits: any[] = [];
  ordresParMachine: { [key: string]: number } = {};  // Statistiques des ordres par machine

  statistiques = {
    termine: 0,
    enCours: 0,
    annule: 0,
    total: 0
  };
user: any;

  constructor(
    private ordreService: OrdreFabricationService,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrdres();
    this.loadProduits();
    // Récupérer tous les ordres au démarrage
    this.ordreService.getOrdresFabrication().subscribe(data => {
      this.ordres = data;  // Assignation des ordres récupérés
      this.getOrdresParMachine();  // Calcul des statistiques
    });
  }

  // Fonction pour calculer le nombre d'ordres par machine
  getOrdresParMachine(): void {
    const ordresParMachine: { [key: string]: number } = {};
    this.ordres.forEach(ordre => {
      const machineNom = ordre.machine.nom;  // Récupérer le nom de la machine
      ordresParMachine[machineNom] = ordresParMachine[machineNom] ? ordresParMachine[machineNom] + 1 : 1;  // Incrémenter ou initialiser
    });
    this.ordresParMachine = ordresParMachine;  // Mettre à jour les statistiques
  }
  loadOrdres(): void {
    this.ordreService.getAllOrdres().subscribe(
      (data) => {
        this.ordres = data;
        this.calculerStatistiques();
      },
      (error) => console.error('Erreur lors du chargement des ordres', error)
    );
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe(
      (data) => this.produits = data,
      (error) => console.error('Erreur lors du chargement des produits', error)
    );
  }

  calculerStatistiques(): void {
    this.statistiques.total = this.ordres.length;
    this.statistiques.termine = this.ordres.filter(o => o.statut === 'Terminé').length;
    this.statistiques.enCours = this.ordres.filter(o => o.statut === 'En cours').length;
    this.statistiques.annule = this.ordres.filter(o => o.statut === 'Annulé').length;
  }

  getTauxTermine(): string {
    return ((this.statistiques.termine / this.statistiques.total) * 100).toFixed(2);
  }

  getTauxEnCours(): string {
    return ((this.statistiques.enCours / this.statistiques.total) * 100).toFixed(2);
  }

  getTauxAnnule(): string {
    return ((this.statistiques.annule / this.statistiques.total) * 100).toFixed(2);
  }
  calculerQuantiteTotaleParProduit(): { [key: string]: number } {
    const quantiteParProduit: { [key: string]: number } = {};
  
    this.ordres.forEach(ordre => {
      const produitNom = ordre.produit.nom;
      if (!quantiteParProduit[produitNom]) {
        quantiteParProduit[produitNom] = 0;
      }
      quantiteParProduit[produitNom] += ordre.quantite;
    });
  
    return quantiteParProduit; // Retourne l'objet avec la quantité totale par produit
  }
  
  
}
