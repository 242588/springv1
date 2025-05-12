import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MachineService } from '../services/machine.service';

@Component({
  selector: 'app-modifier-machine',
  templateUrl: './modifier-machine.component.html',
})
export class ModifierMachineComponent implements OnInit {
  machineForm: FormGroup;
  machineId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private machineService: MachineService,
    public router: Router
  ) {
    this.machineForm = this.fb.group({
      nom: ['', Validators.required],
      etat: ['', Validators.required],
      maintenanceProchaine: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.machineId = +this.route.snapshot.paramMap.get('id')!;
    this.machineService.getMachineById(this.machineId).subscribe((data: any) => {
      this.machineForm.patchValue({
        nom: data.nom,
        etat: data["état"], // ✅ on récupère bien l'état avec accent
        maintenanceProchaine: data.maintenanceProchaine
      });
    });
  }

  onSubmit() {
    if (this.machineForm.valid) {
      const formValues = this.machineForm.value;

      const machineModifiee: any = {
        nom: formValues.nom,
        maintenanceProchaine: formValues.maintenanceProchaine,
        ["état"]: formValues.etat // ✅ clé correcte
      };

      this.machineService.updateMachine(this.machineId, machineModifiee).subscribe(() => {
        this.router.navigate(['/icons']);
      });
    }
  }
}
