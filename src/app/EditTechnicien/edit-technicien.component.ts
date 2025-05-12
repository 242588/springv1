import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnicienService, Technicien, Machine } from '../services/technicien.service';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-edit-technicien',
  templateUrl: './edit-technicien.component.html'
})
export class EditTechnicienComponent implements OnInit {
  technicienId!: number;
  technicien: Technicien = {
    id: 0,
    nom: '',
    competences: '',
    machineAssignee: { id: 0, nom: '', etat: '', maintenanceProchaine: new Date().toISOString() }
};

  machines: Machine[] = [];

  constructor(
    private route: ActivatedRoute,
    private technicienService: TechnicienService,
    private machineService: MachineService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.technicienId = this.route.snapshot.params['id'];
    this.technicienService.getTechnicienById(this.technicienId).subscribe(data => {
      this.technicien = data;
    });

    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }

  onSubmit() {
    this.technicienService.updateTechnicien(this.technicienId, this.technicien).subscribe(
      () => {
        // Redirection vers la page /maps après l'enregistrement
        this.router.navigate(['/maps']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du technicien:', error);
      }
    );
  }
  
}
