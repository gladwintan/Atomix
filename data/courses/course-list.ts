import AtomicStructureH2 from "./chemistry/h2/atomic-structure";
import AcidBaseEquilibriumH2 from "./chemistry/h2/acid-base-equilibrium";
import ChemicalBondingH2 from "./chemistry/h2/chemical-bonding";
import IntroToOrganicChemistryH2 from "./chemistry/h2/intro-to-organic-chemistry";
import AtomicStructureH1 from "./chemistry/h1/atomic-structure";
import AcidBaseEquilibriumH1 from "./chemistry/h1/acid-base-equilibrium";

// course id match those on the database
export const courses = [
  {
    id: 1,
    name: "Atomic Structure",
    description: "Learn about atomic orbitals and trends in ionisation energy",
    lessons: AtomicStructureH2,
  },
  {
    id: 2,
    name: "Acid-Base Equilibrium",
    description:
      "Learn about the different types of acids and bases, pH, buffers, and titration curves",
    lessons: AcidBaseEquilibriumH2,
  },
  {
    id: 3,
    name: "Intro to Organic Chemistry",
    description: "IUPAC naming, displayed formula",
    lessons: ChemicalBondingH2,
  },
  {
    id: 4,
    name: "Chemical Bonding",
    description:
      "Learn about the VSEPR theory, types of bonds, intermolecular forces of attraction and hybridisation",
    lessons: IntroToOrganicChemistryH2,
  },
  {
    id: 5,
    name: "Atomic Structure",
    description: "Learn about atomic orbitals",
    lessons: AtomicStructureH1,
  },
  {
    id: 6,
    name: "Acid-Base Equilibrium",
    description: "Learn about the different types of acids and bases and pH",
    lessons: AcidBaseEquilibriumH1,
  },
];
