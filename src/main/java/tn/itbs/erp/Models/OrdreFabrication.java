package tn.itbs.erp.Models;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ordre_fabrication")
public class OrdreFabrication {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "produit_id")
    private Produit produit;

    private int quantite;
    private LocalDate date;//mappedby="p" , fetch , cascade )
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "machine_id", nullable = false)
    private Machine machine;
    
    private String statut; // "EN_COURS", "TERMINE", "ANNULE"

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public Produit getProduit() {
	    return produit;
	}

	public void setProduit(Produit produit) {
	    this.produit = produit;
	}


	public Machine getMachine() {
	    return machine;
	}

	public void setMachine(Machine machine) {
	    this.machine = machine;
	}


}

