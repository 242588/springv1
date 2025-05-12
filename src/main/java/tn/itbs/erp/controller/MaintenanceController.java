package tn.itbs.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.itbs.erp.Models.Maintenance;
import tn.itbs.erp.Models.Machine;
import tn.itbs.erp.Models.Technicien;
import tn.itbs.erp.exception.ResourceNotFoundException;
import tn.itbs.erp.repository.MaintenanceRepository;
import tn.itbs.erp.repository.MachineRepository;
import tn.itbs.erp.repository.TechnicienRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // ⬅️ Même configuration
@RestController
@RequestMapping("/api/maintenances")
public class MaintenanceController {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Autowired
    private MachineRepository machineRepository;

    @Autowired
    private TechnicienRepository technicienRepository;

    // ✅ GET ALL
    @GetMapping
    public List<Maintenance> getAllMaintenances() {
        return maintenanceRepository.findAll();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Maintenance> getMaintenanceById(@PathVariable Long id) {
        Maintenance maintenance = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance introuvable avec l'identifiant : " + id));
        return ResponseEntity.ok(maintenance);
    }

    // ✅ CREATE (POST)
    @PostMapping
    public ResponseEntity<Maintenance> createMaintenance(@RequestBody Maintenance maintenance) {
        // Vérification des objets liés (Machine et Technicien)
        Machine machine = machineRepository.findById(maintenance.getMachine().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Machine introuvable avec l'ID : " + maintenance.getMachine().getId()));

        Technicien technicien = technicienRepository.findById(maintenance.getTechnicien().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Technicien introuvable avec l'ID : " + maintenance.getTechnicien().getId()));

        // Associer les objets récupérés
        maintenance.setMachine(machine);
        maintenance.setTechnicien(technicien);

        // Sauvegarde
        Maintenance savedMaintenance = maintenanceRepository.save(maintenance);
        return ResponseEntity.ok(savedMaintenance);
    }

    // ✅ UPDATE (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Maintenance> updateMaintenance(@PathVariable Long id, @RequestBody Maintenance maintenanceDetails) {
        Maintenance maintenance = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance introuvable avec l'identifiant : " + id));

        // Vérification et mise à jour des objets liés
        Machine machine = machineRepository.findById(maintenanceDetails.getMachine().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Machine introuvable avec l'ID : " + maintenanceDetails.getMachine().getId()));

        Technicien technicien = technicienRepository.findById(maintenanceDetails.getTechnicien().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Technicien introuvable avec l'ID : " + maintenanceDetails.getTechnicien().getId()));

        // Mise à jour des champs
        maintenance.setMachine(machine);
        maintenance.setTechnicien(technicien);
        maintenance.setDate(maintenanceDetails.getDate());
        maintenance.setType(maintenanceDetails.getType());

        Maintenance updatedMaintenance = maintenanceRepository.save(maintenance);
        return ResponseEntity.ok(updatedMaintenance);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaintenance(@PathVariable Long id) {
        Maintenance maintenance = maintenanceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance introuvable avec l'identifiant : " + id));

        maintenanceRepository.delete(maintenance);
        return ResponseEntity.noContent().build();
    }
}
