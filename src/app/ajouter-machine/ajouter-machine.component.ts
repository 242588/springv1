import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineService, Machine } from '../services/machine.service';

@Component({
  selector: 'app-ajouter-machine',
  templateUrl: './ajouter-machine.component.html',
})
export class AjouterMachineComponent {
  machineForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private machineService: MachineService,
    private router: Router
  ) {
    this.machineForm = this.fb.group({
      nom: ['', Validators.required],
      etat: ['', Validators.required],
      maintenanceProchaine: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.machineForm.valid) {
      const formValues = this.machineForm.value;

      const nouvelleMachine: any = {
        nom: formValues.nom,
        maintenanceProchaine: formValues.maintenanceProchaine,
        ["état"]: formValues.etat // ✅ ne surtout pas ajouter "id" ni "etat" sans accent
      };

      this.machineService.addMachine(nouvelleMachine).subscribe(() => {
        this.router.navigate(['/icons']);
      });
    }
  }
}
