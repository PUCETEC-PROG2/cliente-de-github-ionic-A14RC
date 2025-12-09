import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon
} from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crear</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* Contenedor del formulario de creación */}
        <IonList>
          {/* Campo de entrada para el nombre del repositorio */}
          <IonItem>
            <IonInput 
              label="Nombre del repositorio" 
              labelPlacement="floating" 
              placeholder="Ej: mi-proyecto-nuevo"
            ></IonInput>
          </IonItem>

          {/* Campo de área de texto para la descripción */}
          <IonItem>
            <IonTextarea 
              label="Descripción" 
              labelPlacement="floating" 
              placeholder="Describe brevemente tu proyecto..."
              rows={4}
            ></IonTextarea>
          </IonItem>
        </IonList>

        {/* Botón de acción para enviar el formulario */}
        <div style={{ padding: '20px' }}>
          <IonButton expand="block" shape="round">
            <IonIcon slot="start" icon={addCircleOutline} />
            Crear Repositorio
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;