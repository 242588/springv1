package tn.itbs.erp.Models;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String état;
    private LocalDate maintenanceProchaine;
    
    //Une machine peut être liée à plusieurs ordres de fabrication
    @OneToMany(mappedBy = "machine", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<OrdreFabrication> ordres; // Si lié à OrdreFabrication


    @OneToMany(mappedBy = "machine", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore //fil controlleur mahouch chibadelha json
    private List<Maintenance> maintenances; // Si lié à Maintenance
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getÉtat() {
		return état;
	}
	public void setÉtat(String état) {
		this.état = état;
	}
	public LocalDate getMaintenanceProchaine() {
		return maintenanceProchaine;
	}
	public void setMaintenanceProchaine(LocalDate maintenanceProchaine) {
		this.maintenanceProchaine = maintenanceProchaine;
	}
	
}
