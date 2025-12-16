import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonSpinner
} from '@ionic/react';
import { githubService } from '../services/github.service';
import './Tab3.css';

const Tab3: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await githubService.getUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

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
        
        {loading ? (
           <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
             <IonSpinner name="dots" />
           </div>
        ) : user ? (
          <IonCard style={{ marginTop: '20px' }}>
            <div style={{ height: '120px', background: '#24292e', position: 'relative' }}>
               <img 
                 src={user.avatar_url} 
                 alt="Profile" 
                 style={{ 
                   width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white',
                   position: 'absolute', bottom: '-40px', left: '20px'
                 }} 
               />
            </div>

            <IonCardHeader style={{ marginTop: '40px' }}>
              <IonCardSubtitle style={{ fontSize: '12px' }}>@{user.login}</IonCardSubtitle>
              <IonCardTitle style={{ fontSize: '22px', fontWeight: 'bold' }}>{user.name || user.login}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p style={{ marginBottom: '15px' }}>{user.bio || "Sin biografía disponible"}</p>
              
              <div style={{ display: 'flex', gap: '20px', fontWeight: 'bold', fontSize: '14px' }}>
                <span>{user.public_repos} <span style={{fontWeight:'normal'}}>Repos</span></span>
                <span>{user.followers} <span style={{fontWeight:'normal'}}>Seguidores</span></span>
                <span>{user.following} <span style={{fontWeight:'normal'}}>Siguiendo</span></span>
              </div>
              
              {user.location && <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>📍 {user.location}</p>}
            </IonCardContent>
          </IonCard>
        ) : (
          <p style={{textAlign: 'center'}}>No se pudo cargar el usuario.</p>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Tab3;