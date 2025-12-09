import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel,
  IonThumbnail,
  IonIcon
} from '@ionic/react';
import { musicalNotes, image, musicalNote } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* LISTA ESTILO VISUAL DE LA IMAGEN */}
        <IonList>
          
          <IonItem lines="full">
            <IonThumbnail slot="start" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <IonIcon icon={musicalNotes} style={{fontSize: '30px'}} />
            </IonThumbnail>
            <IonLabel>Repositorio 1</IonLabel>
          </IonItem>

          <IonItem lines="full">
            <IonThumbnail slot="start" style={{background: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               {/* Simulando el icono de paisaje oscuro */}
               <IonIcon icon={image} style={{fontSize: '30px', color: 'white'}} />
            </IonThumbnail>
            <IonLabel>Repositorio 2</IonLabel>
          </IonItem>

          <IonItem lines="full">
            <IonThumbnail slot="start" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
               <IonIcon icon={musicalNote} style={{fontSize: '30px'}} />
            </IonThumbnail>
            <IonLabel>Repositorio 3</IonLabel>
          </IonItem>

        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;