import { Component, OnInit } from '@angular/core';
import { TechnicienService, Technicien } from '../services/technicien.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  techniciens: Technicien[] = [];

  constructor(private technicienService: TechnicienService, private router: Router) {}

  ngOnInit(): void {
    this.getTechniciens();
  }

  ajouterTechnicien() {
    this.router.navigate(['/techniciens/ajouter']);
  }

  getTechniciens(): void {
    this.technicienService.getAllTechniciens().subscribe(data => {
      this.techniciens = data;
    });
  }

  supprimerTechnicien(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce technicien ?')) {
      this.technicienService.deleteTechnicien(id).subscribe(() => {
        this.getTechniciens(); // actualiser la liste
      });
    }
  }

  modifierTechnicien(id: number): void {
    this.router.navigate(['/techniciens/modifier', id]); // redirige vers page de modification
  }

  
}
