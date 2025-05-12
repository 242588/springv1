package tn.itbs.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.Maintenance;

@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Long> { }

