/* eslint-disable import/no-named-as-default */
import React from 'react';
import './import.scss';
import Papaparse from '../Papaparse/Papaparse';

function Import() {
    // Chercher dans le dossier par défaut
    // Si rien de trouvé afficher une dropZone pour import des fichiers manuels
    // Attendu minimum : Adherent + Jeux + Prets + Valo
    // Optionel : Images
    return (
        <div>
            <Papaparse />
        </div>

    );
}

export default React.memo(Import);
