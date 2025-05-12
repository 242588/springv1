import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaintenanceService } from '../services/maintenance.service';
import { Maintenance } from '../models/maintenance';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modifier-maintenance',
  templateUrl: './modifier-maintenance.component.html'
})
export class ModifierMaintenanceComponent implements OnInit {
  maintenanceForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private maintenanceService: MaintenanceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.maintenanceService.getMaintenanceById(this.id).subscribe(data => {
      this.maintenanceForm = this.fb.group({
        date: [data.date],
        type: [data.type],
        machine: [data.machine.id],
        technicien: [data.technicien.id]
      });
    });
  }

  onSubmit(): void {
    const updatedMaintenance: Maintenance = {
      id: this.id,
      date: this.maintenanceForm.value.date,
      type: this.maintenanceForm.value.type,
      machine: {
          id: this.maintenanceForm.value.machine,
          nom: '',
          etat: ''
      },
      technicien: {
          id: this.maintenanceForm.value.technicien,
          nom: '',
          competences: ''
      }
    };

    this.maintenanceService.updateMaintenance(this.id, updatedMaintenance).subscribe(() => {
      this.router.navigate(['/notifications']); // ou ta route principale
    });
  }
}
