import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.isLoading = false;
  
        // Si le backend retourne des infos (token, user...)
        localStorage.setItem('user', JSON.stringify(response.user || {}));
        localStorage.setItem('authToken', response.token);  // Stockez le token dans localStorage
  
        // Redirigez l'utilisateur vers une page protégée après la connexion réussie
        this.router.navigate(['/dashboard']); // Remplacez '/dashboard' par la route de votre choix
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'Erreur de connexion';
      }
    );
  }
}
