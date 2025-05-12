package tn.itbs.erp.Models;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Maintenance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
// plusieurs maintenances peuvent concerner une même machine.
    @ManyToOne(cascade = CascadeType.PERSIST)//ki chnzid maintenance w machine moch mawjouda tetzed(il faut le corrigé)
    @JoinColumn(name = "machine_id", nullable = false)
    @JsonIgnoreProperties("maintenances")
    private Machine machine;
    
    @ManyToOne
    @JoinColumn(name = "technicien_id")
    @JsonIgnoreProperties("maintenances")//On ignore la liste maintenances dans la classe technicien
    
    private Technicien technicien;

    private LocalDate date;
    private String type;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Machine getMachine() {
	    return machine;
	}

	public void setMachine(Machine machine) {
	    this.machine = machine;
	}

	public Technicien getTechnicien() {
		// TODO Auto-generated method stub
		return technicien;
	}
	public void setTechnicien(Technicien technicien) {
		// TODO Auto-generated method stub
		this.technicien=technicien ;
		
	}
}

