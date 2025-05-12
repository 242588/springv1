package tn.itbs.erp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tn.itbs.erp.Models.OrdreFabrication;
import tn.itbs.erp.repository.OrdreFabricationRepository;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> { }



