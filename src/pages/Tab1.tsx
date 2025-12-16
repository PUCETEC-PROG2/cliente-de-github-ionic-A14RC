import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, 
  IonItem, IonLabel, IonThumbnail, IonIcon, IonSpinner, IonText 
} from '@ionic/react';
import { codeSlash } from 'ionicons/icons';
import { githubService } from '../services/github.service'; 
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await githubService.getRepos();
        setRepos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {repos.map((repo: any) => (
              <IonItem key={repo.id} lines="full" detail={true} href={`https://github.com/${repo.full_name}`} target="_blank">
                <IonThumbnail slot="start" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4', borderRadius: '50%'}}>
                   <IonIcon icon={codeSlash} style={{fontSize: '25px', color: '#333'}} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{repo.name}</h2>
                  <p>{repo.description || "Sin descripción"}</p>
                  {repo.language && <IonText color="medium" style={{fontSize: '0.8em'}}>Lenguaje: {repo.language}</IonText>}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;