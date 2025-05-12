export interface Technicien {
  id: number;
  nom: string;
  competences: string;
}

export interface Machine {
  id: number;
  nom: string;
  etat: string;
}

export interface Maintenance {
  id: number;
  date: Date;
  type: string;
  machine: Machine;
  technicien: Technicien;
}
