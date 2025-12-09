import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* ICONOS: Logo de GitHub, Círculo con más, Círculo de persona */
import { logoGithub, addCircle, personCircle } from 'ionicons/icons'; 

import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        
        
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon aria-hidden="true" icon={logoGithub} />
            <IonLabel>Repositorios</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon aria-hidden="true" icon={addCircle} />
            <IonLabel>Crear repositorio</IonLabel>
          </IonTabButton>
          
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon aria-hidden="true" icon={personCircle} />
            <IonLabel>Usuario</IonLabel>
          </IonTabButton>
        </IonTabBar>
        
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;