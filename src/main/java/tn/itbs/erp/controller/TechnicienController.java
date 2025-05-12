package tn.itbs.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.itbs.erp.Models.Machine;
import tn.itbs.erp.Models.Technicien;
import tn.itbs.erp.repository.MachineRepository;
import tn.itbs.erp.repository.TechnicienRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // ⬅️ Même configuration
@RestController
@RequestMapping("/api/techniciens")
public class TechnicienController {

    @Autowired
    private TechnicienRepository technicienRepository;

    @GetMapping
    public List<Technicien> getAllTechniciens() {
        return technicienRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technicien> getTechnicienById(@PathVariable Long id) {
        return technicienRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Autowired
    private MachineRepository machineRepository;

    @PostMapping
    public ResponseEntity<Technicien> createTechnicien(@RequestBody Technicien technicien) {
        // Récupérer la machine associée par son ID
        Machine machine = machineRepository.findById(technicien.getMachineAssignee().getId())
                .orElseThrow(() -> new RuntimeException("Machine introuvable avec l'ID : " + technicien.getMachineAssignee().getId()));

        // Assigner la machine au technicien
        technicien.setMachineAssignee(machine);

        // Sauvegarder le technicien
        Technicien newTechnicien = technicienRepository.save(technicien);
        return ResponseEntity.ok(newTechnicien);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technicien> updateTechnicien(@PathVariable Long id, @RequestBody Technicien technicienDetails) {
        Technicien technicien = technicienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Technicien introuvable avec l'identifiant : " + id));

        technicien.setNom(technicienDetails.getNom());
        technicien.setCompetences(technicienDetails.getCompetences());
        technicien.setMachineAssignee(technicienDetails.getMachineAssignee());

        Technicien updatedTechnicien = technicienRepository.save(technicien);
        return ResponseEntity.ok(updatedTechnicien);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnicien(@PathVariable Long id) {
        Technicien technicien = technicienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Technicien introuvable avec l'identifiant : " + id));

        technicienRepository.delete(technicien);
        return ResponseEntity.noContent().build();
    }
}
