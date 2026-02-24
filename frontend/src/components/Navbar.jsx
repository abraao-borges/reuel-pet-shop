import { PET_SPECIES_OPTIONS } from "../constants/petSpecies";

const Navbar = ({ selectedSpecies = "ALL", onSpeciesChange }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        {PET_SPECIES_OPTIONS.map((species) => (
          <button
            key={species.value}
            className={`nav-item ${selectedSpecies === species.value ? "active" : ""}`}
            onClick={() => onSpeciesChange?.(species.value)}
            type="button"
          >
            {species.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;