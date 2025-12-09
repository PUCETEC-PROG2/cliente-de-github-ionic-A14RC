import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* TARJETA TIPO COVER */}
        <IonCard style={{ marginTop: '20px' }}>
          {}
          <div style={{ height: '150px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             {}
             <div style={{ width: '40px', height: '40px', background: '#ccc', borderRadius: '50%', marginLeft: '100px', marginBottom: '50px' }}></div>
             {}
             <div style={{ position: 'absolute', marginTop: '50px', width: 0, height: 0, borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: '80px solid #555', transform: 'translateX(-40px)' }}></div>
             <div style={{ position: 'absolute', marginTop: '50px', width: 0, height: 0, borderLeft: '40px solid transparent', borderRight: '40px solid transparent', borderBottom: '60px solid #777', transform: 'translateX(40px)' }}></div>
          </div>

          <IonCardHeader>
            <IonCardSubtitle style={{ fontSize: '10px', letterSpacing: '1px' }}>Andrés Ricardo Romero Castillo</IonCardSubtitle>
            <IonCardTitle style={{ fontSize: '22px', fontWeight: 'bold', color: 'black' }}>ARRC</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Este es el perfil de Andrés Ricardo Romero Castillo, estudiante de desarrollo móvil.
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;