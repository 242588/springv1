package tn.itbs.erp.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Technicien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
   
    
    private String nom;
    private String competences;
    
    

    @ManyToOne
    @JoinColumn(name = "machine_assignee")//cle etranger liee a un attribut appele machineAssignee
    private Machine machineAssignee;

    
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

	public String getCompetences() {
		return competences;
	}

	public void setCompetences(String competences) {
		this.competences = competences;
	}

	public Machine getMachineAssignee() {
	    return machineAssignee;
	}

	public void setMachineAssignee(Machine machineAssignee) {
	    this.machineAssignee = machineAssignee;
	}


	
}
