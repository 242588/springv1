package tn.itbs.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.itbs.erp.Models.Machine;
import tn.itbs.erp.repository.MachineRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // ⬅️ Même configuration
@RestController
@RequestMapping("/api/machines")
public class MachineController {

    @Autowired
    private MachineRepository machineRepository; //famech objet de type MachineRepository

    @GetMapping
    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Machine> getMachineById(@PathVariable Long id) {
        return machineRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Machine> createMachine(@RequestBody Machine machine) {
        Machine savedMachine = machineRepository.save(machine);
        return ResponseEntity.ok(savedMachine);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Machine> updateMachine(@PathVariable Long id, @RequestBody Machine machineDetails) {
        Machine machine = machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine introuvable avec l'identifiant : " + id));

        machine.setNom(machineDetails.getNom());
        machine.setÉtat(machineDetails.getÉtat());
        machine.setMaintenanceProchaine(machineDetails.getMaintenanceProchaine());

        Machine updatedMachine = machineRepository.save(machine);
        return ResponseEntity.ok(updatedMachine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMachine(@PathVariable Long id) {
        Machine machine = machineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Machine introuvable avec l'identifiant : " + id));

        machineRepository.delete(machine);
        return ResponseEntity.noContent().build();//réponse 204 (requête réussie, pas de contenu)
    }
}
