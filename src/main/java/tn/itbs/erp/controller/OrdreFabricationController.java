package tn.itbs.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.itbs.erp.Models.OrdreFabrication;
import tn.itbs.erp.Models.Produit;
import tn.itbs.erp.Models.Machine;
import tn.itbs.erp.repository.OrdreFabricationRepository;
import tn.itbs.erp.repository.ProduitRepository;
import tn.itbs.erp.repository.MachineRepository;

import java.util.List;
@CrossOrigin(
	    origins = "http://localhost:4200",
	    methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE },
	    allowedHeaders = { "Authorization", "Content-Type" }
	)

@RestController //les api yraj3ou json 
@RequestMapping("/api/ordres") //norbet api ili amalthom bil route hedhi
public class OrdreFabricationController {

    @Autowired
    private OrdreFabricationRepository ordreFabricationRepository;

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired //initialiser de onstructeur
    private MachineRepository machineRepository;

    @GetMapping
    public List<OrdreFabrication> getAllOrdres() {
        return ordreFabricationRepository.findAll();
    }

    @GetMapping("/{id}")//definition de api , c'est route 
    public ResponseEntity<OrdreFabrication> getOrdreById(@PathVariable Long id) {//id injecter mil path 
        return ordreFabricationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
//front yab3th objet json donc post chte5ou json hedhek bil body
    @PostMapping
    public ResponseEntity<OrdreFabrication> createOrdre(@RequestBody OrdreFabrication ordre) {
        // Vérification si le produit existe
        Produit produit = produitRepository.findById(ordre.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit non trouvé avec l'identifiant : " + ordre.getProduit().getId()));

        // Vérification si la machine existe
        Machine machine = machineRepository.findById(ordre.getMachine().getId())
                .orElseThrow(() -> new RuntimeException("Machine non trouvée avec l'identifiant : " + ordre.getMachine().getId()));

        // Assigner les entités persistées à l'ordre de fabrication
        ordre.setProduit(produit);
        ordre.setMachine(machine);

        // Sauvegarde de l'ordre de fabrication
        OrdreFabrication savedOrdre = ordreFabricationRepository.save(ordre);
        return ResponseEntity.ok(savedOrdre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdreFabrication> updateOrdre(@PathVariable Long id, @RequestBody OrdreFabrication ordreDetails) {
        // Recherche l'ordre de fabrication
        OrdreFabrication ordre = ordreFabricationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordre de fabrication introuvable avec l'identifiant : " + id));

        // Récupération des entités Machine et Produit depuis la base de données
        Machine machine = machineRepository.findById(ordreDetails.getMachine().getId())
                .orElseThrow(() -> new RuntimeException("Machine introuvable avec l'identifiant : " + ordreDetails.getMachine().getId()));

        Produit produit = produitRepository.findById(ordreDetails.getProduit().getId())
                .orElseThrow(() -> new RuntimeException("Produit introuvable avec l'identifiant : " + ordreDetails.getProduit().getId()));

        // Mise à jour des attributs de l'ordre avec les entités attachées
        ordre.setProduit(produit);
        ordre.setQuantite(ordreDetails.getQuantite());
        ordre.setDate(ordreDetails.getDate());
        ordre.setMachine(machine);
        ordre.setStatut(ordreDetails.getStatut());

        // Sauvegarde de l'ordre mis à jour
        OrdreFabrication updatedOrdre = ordreFabricationRepository.save(ordre);
        return ResponseEntity.ok(updatedOrdre);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrdre(@PathVariable Long id) {
        OrdreFabrication ordre = ordreFabricationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordre de fabrication introuvable avec l'identifiant : " + id));

        ordreFabricationRepository.delete(ordre);
        return ResponseEntity.noContent().build();
    }
}
//def des api 
//on delete cascad ki tetnaha machine l ordre tetnaha 