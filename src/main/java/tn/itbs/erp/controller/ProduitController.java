package tn.itbs.erp.controller;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import tn.itbs.erp.Models.Produit;
import tn.itbs.erp.repository.ProduitRepository;

@CrossOrigin(origins = "http://localhost:4200") // ⬅️ Même configuration
@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        return produitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produit createProduit(@RequestBody Produit produit) {
        return produitRepository.save(produit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produit> updateProduit(@PathVariable Long id, @RequestBody Produit produitDetails) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable avec l'identifiant : " + id));

        produit.setNom(produitDetails.getNom());
        produit.setType(produitDetails.getType());
        produit.setStock(produitDetails.getStock());
        produit.setFournisseur(produitDetails.getFournisseur());

        Produit updatedProduit = produitRepository.save(produit);
        return ResponseEntity.ok(updatedProduit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProduit(@PathVariable Long id) {
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable avec l'identifiant : " + id));
        
        produitRepository.delete(produit);
        
        Map<String, Boolean> response = new HashMap<>();
        response.put("supprimé avec succès", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
