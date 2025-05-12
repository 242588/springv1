import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login1']); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    } else {
      // Récupérez les informations de l'utilisateur depuis l'API ou à partir du token
      this.user = { username: 'Exemple', email: 'exemple@mail.com' }; // Utilisez l'API pour récupérer ces données
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirection vers la page de connexion après la déconnexion
  }
}
