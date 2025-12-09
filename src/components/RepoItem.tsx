import React from 'react';
import { IonItem, IonLabel, IonNote, IonIcon, IonText } from '@ionic/react';
import { starOutline, codeSlashOutline } from 'ionicons/icons';
import './RepoItem.css';

// Definimos la estructura de datos que esperamos recibir (Props)
interface RepoItemProps {
  name: string;
  description?: string; // El signo ? significa que es opcional
  language?: string;
  stars: number;
}

const RepoItem: React.FC<RepoItemProps> = ({ name, description, language, stars }) => {
  return (
    // IonItem es el bloque básico de una lista en Ionic
    <IonItem button detail={true}> 
      <IonLabel className="ion-text-wrap">
        {/* Título del repositorio */}
        <IonText color="primary">
          <h2><strong>{name}</strong></h2>
        </IonText>
        
        {/* Descripción (se muestra solo si existe) */}
        {description && <p>{description}</p>}
        
        {/* Fila de metadatos: Lenguaje y Estrellas */}
        <div style={{ marginTop: '8px', display: 'flex', gap: '15px', fontSize: '0.85em' }}>
          {language && (
            <IonNote color="medium" style={{ display: 'flex', alignItems: 'center' }}>
              <IonIcon icon={codeSlashOutline} style={{ marginRight: '4px' }} />
              {language}
            </IonNote>
          )}
          
          <IonNote color="warning" style={{ display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={starOutline} style={{ marginRight: '4px' }} />
            {stars}
          </IonNote>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default RepoItem;