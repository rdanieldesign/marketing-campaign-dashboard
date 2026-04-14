import { useEffect } from 'react';
import { DevControls } from './components/DevControls/DevControls';
import { FilterBar } from './components/FilterBar/FilterBar';
import { AtAGlanceBar } from './components/AtAGlanceBar/AtAGlanceBar';
import { CampaignList } from './components/CampaignList/CampaignList';
import { NotificationToast } from './components/NotificationToast/NotificationToast';
import { useAppSelector } from './store';
import { setSimulateError } from './mocks/handlers';
import styles from './App.module.css';

function App() {
  const simulateError = useAppSelector((state) => state.ui.simulateError);

  // Sync Redux simulateError state to MSW handlers
  useEffect(() => {
    setSimulateError(simulateError);
  }, [simulateError]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Campaign Orbit</h1>
        <p className={styles.subtitle}>Ad Manager Dashboard</p>
      </header>

      <main className={styles.main}>
        <DevControls />
        <FilterBar />
        <AtAGlanceBar />
        <CampaignList />
      </main>

      <NotificationToast />
    </div>
  );
}

export default App
