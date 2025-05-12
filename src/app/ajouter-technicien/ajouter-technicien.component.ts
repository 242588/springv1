import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicienService } from '../services/technicien.service';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-ajouter-technicien',
  templateUrl: './ajouter-technicien.component.html'
})
export class AjouterTechnicienComponent implements OnInit {
  technicien = {
    nom: '',
    competences: '',
    machineAssigneeId: null
  };

  machines: any[] = [];

  constructor(
    private technicienService: TechnicienService,
    private machineService: MachineService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.machineService.getMachines().subscribe({
      next: (data) => {
        this.machines = data;
      },
      error: (err) => {
        console.error('Erreur chargement machines :', err);
      }
    });
  }

  onSubmit(): void {
    // Construire l’objet attendu par le backend
    const technicienAEnvoyer = {
      nom: this.technicien.nom,
      competences: this.technicien.competences,
      machineAssignee: {
        id: this.technicien.machineAssigneeId
      }
    };

    this.technicienService.ajouterTechnicien(technicienAEnvoyer).subscribe({
      next: () => {
        alert('Technicien ajouté avec succès !');
        this.router.navigate(['/maps']);
      },
      error: (err) => {
        console.error('Erreur ajout technicien :', err);
        alert('Erreur lors de l\'ajout du technicien.');
      }
    });
  }
}
