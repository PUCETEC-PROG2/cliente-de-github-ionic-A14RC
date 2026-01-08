import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonInput, IonTextarea, IonButton, IonIcon,
  IonList, IonToggle, IonLoading, IonToast, IonLabel
} from '@ionic/react';
import { addCircleOutline, saveOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { githubService } from '../services/github.service';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalName, setOriginalName] = useState('');
  const [owner, setOwner] = useState('');

  const history = useHistory();
  const location = useLocation<any>();

  useEffect(() => {
    if (location.state && location.state.repo) {
      const { repo } = location.state;
      setIsEditMode(true);
      setName(repo.name);
      setOriginalName(repo.name);
      setDescription(repo.description || '');
      setOwner(repo.owner.login);
      setIsPrivate(repo.private);
    } else {
      setIsEditMode(false);
      setName('');
      setDescription('');
      setIsPrivate(false);
    }
  }, [location]);

  const handleAction = async () => {
    if (!name.trim()) {
      setMessage("El nombre es obligatorio");
      return;
    }
    setLoading(true);
    try {
      if (isEditMode) {
        await githubService.updateRepo(owner, originalName, name, description);
        setMessage("¡Repositorio actualizado!");
      } else {
        await githubService.createRepo(name, description, isPrivate);
        setMessage("¡Repositorio creado!");
      }
      setTimeout(() => {
        history.push('/tab1');
        window.location.reload(); 
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Error en la operación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditMode ? 'Editar Repositorio' : 'Crear Repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Procesando..." />
        <IonToast
          isOpen={!!message}
          message={message || ''}
          duration={2000}
          onDidDismiss={() => setMessage(null)}
          color={message?.includes('Error') ? 'danger' : 'success'}
        />

        <IonList inset={true}>
          <IonItem>
            <IonInput 
              label="Nombre *" 
              labelPlacement="floating" 
              value={name}
              onIonInput={e => setName(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonTextarea 
              label="Descripción" 
              labelPlacement="floating" 
              rows={3}
              value={description}
              onIonInput={e => setDescription(e.detail.value!)}
            ></IonTextarea>
          </IonItem>

          {!isEditMode && (
            <IonItem lines="none">
              <IonLabel>Privado</IonLabel>
              <IonToggle 
                slot="end" 
                checked={isPrivate}
                onIonChange={e => setIsPrivate(e.detail.checked)}
              ></IonToggle>
            </IonItem>
          )}
        </IonList>

        <div style={{ padding: '20px' }}>
          <IonButton expand="block" shape="round" onClick={handleAction}>
            <IonIcon slot="start" icon={isEditMode ? saveOutline : addCircleOutline} />
            {isEditMode ? 'Guardar Cambios' : 'Crear Repositorio'}
          </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;