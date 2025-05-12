package tn.itbs.erp.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.itbs.erp.Models.OrdreFabrication;
import tn.itbs.erp.repository.OrdreFabricationRepository;

@Service
public class OrdreFabricationService {
    @Autowired
    private OrdreFabricationRepository ordreFabricationRepository;

    public List<OrdreFabrication> getAllOrdres() {
        return ordreFabricationRepository.findAll();
    }

    public OrdreFabrication createOrdre(OrdreFabrication ordre) {
        return ordreFabricationRepository.save(ordre);
    }

    public void deleteOrdre(Long id) {
        ordreFabricationRepository.deleteById(id);
    }
}

