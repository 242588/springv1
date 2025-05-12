package tn.itbs.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.Technicien;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> { }

