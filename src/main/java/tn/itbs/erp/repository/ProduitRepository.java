package tn.itbs.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.Produit;


@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> { }
