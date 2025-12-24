import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonIcon,
  IonList, IonToggle, IonLoading, IonToast
} from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Para redirigir al Tab1 al terminar
import { githubService } from '../services/github.service';
import './Tab2.css';

const Tab2: React.FC = () => {
  // Estados para el formulario
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  
  // Estados para feedback visual
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const history = useHistory();

  const handleCreate = async () => {
    // 1. Validación simple
    if (!name.trim()) {
      setMessage("El nombre del repositorio es obligatorio");
      return;
    }

    setLoading(true);
    try {
      // 2. Llamada al servicio (POST)
      await githubService.createRepo(name, description, isPrivate);
      
      // 3. Éxito
      setMessage("¡Repositorio creado con éxito!");
      setName('');
      setDescription('');
      
      // Opcional: Redirigir a la lista después de 1.5 segundos
      setTimeout(() => {
        history.push('/tab1');
        // Forzar recarga de la lista si fuera necesario (Tab1 lo hace con useEffect)
        window.location.href = '/tab1'; 
      }, 1500);

    } catch (error: any) {
      // 4. Manejo de errores
      console.error(error);
      setMessage(error.response?.data?.message || "Error al crear el repositorio");
    } finally {
      setLoading(false);
    }
  };

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
        
        {/* Feedback visual: Loading y Toast */}
        <IonLoading isOpen={loading} message="Creando repositorio en GitHub..." />
        <IonToast
          isOpen={!!message}
          message={message || ''}
          duration={2000}
          onDidDismiss={() => setMessage(null)}
          color={message?.includes('éxito') ? 'success' : 'danger'}
        />

        <IonList inset={true}>
          <IonItem>
            <IonInput 
              label="Nombre *" 
              labelPlacement="floating" 
              placeholder="mi-proyecto-nuevo"
              value={name}
              onIonInput={e => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonTextarea 
              label="Descripción" 
              labelPlacement="floating" 
              placeholder="¿De qué trata este proyecto?"
              rows={3}
              value={description}
              onIonInput={e => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>

          <IonItem lines="none">
            <IonLabel>Privado</IonLabel>
            <IonToggle 
              slot="end" 
              checked={isPrivate}
              onIonChange={e => setIsPrivate(e.detail.checked)}
            ></IonToggle>
          </IonItem>
        </IonList>

        <div style={{ padding: '20px' }}>
          <IonButton expand="block" shape="round" onClick={handleCreate}>
            <IonIcon slot="start" icon={addCircleOutline} />
            Crear Repositorio
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;