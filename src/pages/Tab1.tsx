import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, 
  IonItem, IonLabel, IonThumbnail, IonIcon, IonSpinner,
  IonAlert, IonItemSliding, IonItemOptions, IonItemOption
} from '@ionic/react';
import { codeSlash, trash, create } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { githubService } from '../services/github.service'; 
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  const history = useHistory();

  const fetchRepos = async () => {
    setLoading(true);
    try {
      const data = await githubService.getRepos();
      setRepos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleEdit = (repo: any) => {
    history.push({
      pathname: '/tab2',
      state: { repo }
    });
  };

  const confirmDelete = (repo: any) => {
    setSelectedRepo(repo);
    setShowAlert(true);
  };

  const handleDelete = async () => {
    if (selectedRepo) {
      try {
        await githubService.deleteRepo(selectedRepo.owner.login, selectedRepo.name);
        fetchRepos();
      } catch (error) {
        console.error(error);
      }
    }
  };

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
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Eliminar'}
          message={`¿Estás seguro de eliminar ${selectedRepo?.name}?`}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', handler: handleDelete }
          ]}
        />

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {repos.map((repo: any) => (
              <IonItemSliding key={repo.id}>
                <IonItem lines="full" detail={true} href={`https://github.com/${repo.full_name}`} target="_blank">
                  <IonThumbnail slot="start" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4', borderRadius: '50%'}}>
                     <IonIcon icon={codeSlash} style={{fontSize: '25px', color: '#333'}} />
                  </IonThumbnail>
                  <IonLabel>
                    <h2>{repo.name}</h2>
                    <p>{repo.description || "Sin descripción"}</p>
                  </IonLabel>
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption color="primary" onClick={() => handleEdit(repo)}>
                    <IonIcon slot="icon-only" icon={create} />
                  </IonItemOption>
                  <IonItemOption color="danger" onClick={() => confirmDelete(repo)}>
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;