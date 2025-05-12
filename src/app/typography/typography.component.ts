import { Component, OnInit } from '@angular/core';
import { OrdreFabricationService } from '../services/ordre-fabrication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  ordres: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private ordreService: OrdreFabricationService, private router: Router) {}

  ngOnInit(): void {
    this.ordreService.getOrdresFabrication().subscribe({
      next: (data) => {
        this.ordres = data;
        this.isLoading = false;
        console.log('Données reçues:', data); // Vérifiez la structure des données
      },
      error: (err) => {
        this.errorMessage = 'Échec du chargement des ordres. Veuillez réessayer.';
        this.isLoading = false;
        console.error('Erreur API:', err);
      }
      
    });
    console.log(this.ordres); // Vérifie que chaque ordre a bien un id

  }

  editOrdre(ordre: any) {
    this.router.navigate(['/modifier-ordre', ordre.id]);
  }
  
  // ✅ Méthode pour supprimer un ordre
  deleteOrdre(id: number) {
    if (!id) {
      console.error("ID invalide");
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer cet ordre ?')) {
      this.ordreService.deleteOrdre(id).subscribe({
        next: () => {
          this.ordres = this.ordres.filter(ordre => ordre.id !== id); // Filtrer l'ordre supprimé du tableau
          alert('Ordre supprimé avec succès !');
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de l'ordre", err);
          alert("Erreur lors de la suppression !");
        }
      });
    }
  }
  

  // ✅ Naviguer vers le formulaire d'ajout
  openAddOrdreModal() {
    this.router.navigate(['/ajouter-ordre']); // Assurez-vous que cette route existe dans `app-routing.module.ts`
  }
}
