// src/app/modifier-ordre/modifier-ordre.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdreFabricationService } from '../services/ordre-fabrication.service';
import { MachineService } from 'app/services/machine.service';

@Component({
  selector: 'app-modifier-ordre',
  templateUrl: './modifier-ordre.component.html',
  styleUrls: ['./modifier-ordre.component.scss']
})
export class ModifierOrdreComponent implements OnInit {
  ordreId!: number;
  ordre = {
    produit: '',
    quantite: null,
    date: '',
    machine: '',
    statut: ''
  };

  constructor(
    private route: ActivatedRoute,
    private ordreService: OrdreFabricationService,
    private machineService: MachineService,
    private router: Router
  ) {}
  machines: any[] = [];

  ngOnInit(): void {
    this.ordreId = Number(this.route.snapshot.paramMap.get('id'));

    this.ordreService.getOrdreById(this.ordreId).subscribe({
      next: (data) => {
        this.ordre = {
          produit: data.produit.id,
          quantite: data.quantite,
          date: data.date,
          machine: data.machine.id,
          statut: data.statut
        };
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'ordre", err);
        alert("Erreur de chargement");
      }
    });
    this.machineService.getMachines().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des machines", err);
      }
    });
  }

  onSubmit() {
    const updatedOrdre = {
      produit: { id: this.ordre.produit },
      quantite: this.ordre.quantite,
      date: this.ordre.date,
      machine: { id: this.ordre.machine },
      statut: this.ordre.statut
    };

    this.ordreService.updateOrdre(this.ordreId, updatedOrdre).subscribe({
      next: () => {
        alert("Ordre modifié avec succès !");
        this.router.navigate(['/']);
      },
      error: () => {
        alert("Erreur lors de la mise à jour !");
      }
    });
  }

  annuler() {
    this.router.navigate(['/typography']);
  }
}
