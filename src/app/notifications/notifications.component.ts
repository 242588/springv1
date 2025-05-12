import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../services/maintenance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  ajouterM() {
    this.router.navigate(['/ajouter-maintenance']);
  }
  maintenances: any[] = [];
  http: any;

  
  constructor(
    private maintenanceService: MaintenanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMaintenances();
  }

  getMaintenances(): void {
    this.maintenanceService.getAll().subscribe(data => {
      // Ajouter un ID fictif si inexistant
      this.maintenances = data.map((m: any, index: number) => ({
        ...m,
        id: m.id ?? index
      }));
      console.log("Maintenances corrigées :", this.maintenances);
    });
  }

  modifierMaintenance(id: number): void {
    this.router.navigate(['/modifier-maintenance', id]);
  }

  supprimerMaintenance(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette maintenance ?')) {
      this.maintenanceService.supprimerMaintenance(id).subscribe({
        next: () => {
          // Filtrer la maintenance supprimée de la liste
          this.maintenances = this.maintenances.filter(m => m.id !== id);
          console.log('Maintenance supprimée avec succès.');
        },
        error: err => {
          console.error('Erreur lors de la suppression de la maintenance :', err);
        }
      });
    }
  }
  
  
  

  trackByFn(index: number, item: any): any {
    return item.id ?? index;
  }
}
