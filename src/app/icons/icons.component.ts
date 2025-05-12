import { Component, OnInit } from '@angular/core';
import { Machine, MachineService } from '../services/machine.service';

@Component({
  selector: 'app-machine',
  templateUrl: './icons.component.html',
})
export class IconsComponent implements OnInit {

  machines: Machine[] = [];

  constructor(private machineService: MachineService) {}

  ngOnInit(): void {
    this.machineService.getMachines().subscribe(data => {
      console.log(data); // 👀 pour vérifier si "etat" est bien dans les objets
      this.machines = data;
    });
  }

  loadMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
    });
  }

  successMessage: string = '';

  supprimerMachine(id: number): void {
    this.machineService.supprimerMachine(id).subscribe(() => {
      this.machines = this.machines.filter(m => m.id !== id);
    });
  }
  

}
