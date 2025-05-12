package tn.itbs.erp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.Machine;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> { }

