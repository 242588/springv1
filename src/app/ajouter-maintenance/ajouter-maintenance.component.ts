import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceService } from '../services/maintenance.service';
import { MachineService } from '../services/machine.service';
import { TechnicienService } from '../services/technicien.service';

@Component({
  selector: 'app-ajouter-maintenance',
  templateUrl: './ajouter-maintenance.component.html'
})
export class AjouterMaintenanceComponent implements OnInit {
  maintenance = {
    machineId: null,
    technicienId: null,
    date: '',
    type: ''
  };

  machines = [];
  techniciens = [];

  constructor(
    private maintenanceService: MaintenanceService,
    private machineService: MachineService,
    private technicienService: TechnicienService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.machineService.getMachines().subscribe(
      (data) => this.machines = data,
      (error) => console.error('Erreur lors de la récupération des machines', error)
    );
    this.technicienService.getAllTechniciens().subscribe(
      (data) => this.techniciens = data,
      (error) => console.error('Erreur lors de la récupération des techniciens', error)
    );
  }

  onSubmit(): void {
    if (!this.maintenance.machineId || !this.maintenance.technicienId) {
      console.error('Machine ou Technicien manquant !');
      return;
    }
  
    this.maintenanceService.ajouterM(this.maintenance).subscribe({
      next: () => {
        this.router.navigate(['/notifications']);
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
      }
    });
  }
  
}
