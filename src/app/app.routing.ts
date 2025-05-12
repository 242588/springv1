import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { IconsComponent } from './icons/icons.component';
import { OrdreFabricationFormComponent } from './ordre-fabrication-form/ordre-fabrication-form.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ModifierOrdreComponent } from './modifier-ordre/modifier-ordre.component';
import { TableListComponent } from './table-list/table-list.component';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';
import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { AjouterMachineComponent } from './ajouter-machine/ajouter-machine.component';
import { ModifierMachineComponent } from './modifier-machine/modifier-machine.component';
import { MapsComponent } from './maps/maps.component';
import { EditTechnicienComponent } from './EditTechnicien/edit-technicien.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModifierMaintenanceComponent } from './modifier-maintenance/modifier-maintenance.component';
import { AjouterTechnicienComponent } from './ajouter-technicien/ajouter-technicien.component';
import { AjouterMaintenanceComponent } from './ajouter-maintenance/ajouter-maintenance.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'notifications', component: NotificationsComponent },
  { path: 'techniciens/edit/:id', component: EditTechnicienComponent },
  { path: 'techniciens/modifier/:id', component: MapsComponent },
  { path: 'machines/modifier/:id', component: ModifierMachineComponent },
  { path: 'machines/ajouter', component: AjouterMachineComponent },
  { path: 'machines', component: IconsComponent, },
  { path: 'ajouter-produit', component: AjouterProduitComponent },
  { path: 'modifier-ordre/:id', component: ModifierOrdreComponent },
  { path: 'produits', component: TableListComponent },
  { path: 'modifier-produit/:id', component: ModifierProduitComponent },
  { path: 'ajouter-ordre', component: OrdreFabricationFormComponent },
  { path: 'modifier-maintenance/:id', component: ModifierMaintenanceComponent },
  { path: 'techniciens/ajouter', component: AjouterTechnicienComponent },
  { path: 'ajouter-maintenance', component: AjouterMaintenanceComponent }
,{ path: 'login', component: LoginComponent },

  // Redirection par défaut vers 'notifications'
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, 

  // Charge AdminLayout et ses enfants
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin-layout/admin-layout.module').then(
            (m) => m.AdminLayoutModule
          ),canActivate: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }) // ✅ NE PAS dupliquer cette ligne
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
