import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { ModifierOrdreComponent } from './modifier-ordre/modifier-ordre.component'; // ou autre composant


import { OrdreFabricationService } from './services/ordre-fabrication.service';

import { OrdreFabricationFormComponent } from './ordre-fabrication-form/ordre-fabrication-form.component';
import { ProduitService } from './services/produit.service';
import { ModifierProduitComponent } from './modifier-produit/modifier-produit.component';

import { AjouterProduitComponent } from './ajouter-produit/ajouter-produit.component';
import { AjouterMachineComponent } from './ajouter-machine/ajouter-machine.component';
import { ModifierMachineComponent } from './modifier-machine/modifier-machine.component';
import { EditTechnicienComponent } from './EditTechnicien/edit-technicien.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModifierMaintenanceComponent } from './modifier-maintenance/modifier-maintenance.component';
import { AjouterTechnicienComponent } from './ajouter-technicien/ajouter-technicien.component'; 
import { AjouterMaintenanceComponent } from './ajouter-maintenance/ajouter-maintenance.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    
    RouterModule,
    AppRoutingModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    ModifierOrdreComponent,
    ModifierProduitComponent,

    
    OrdreFabricationFormComponent,
    AjouterProduitComponent,
    AjouterMachineComponent,
    ModifierMachineComponent,

    EditTechnicienComponent,
    
    ModifierMaintenanceComponent,
    AjouterTechnicienComponent,
    AjouterMaintenanceComponent,
    LoginComponent,

     // 🔹 Ajout du composant ici
  ],
  providers: [OrdreFabricationService,
    ProduitService
  ], // 🔹 Ajout du service ici
  bootstrap: [AppComponent]
})
export class AppModule { }
