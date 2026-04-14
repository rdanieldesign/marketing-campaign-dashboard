import { DevControls } from './components/DevControls/DevControls';
import { FilterBar } from './components/FilterBar/FilterBar';
import { AtAGlanceBar } from './components/AtAGlanceBar/AtAGlanceBar';
import { CampaignList } from './components/CampaignList/CampaignList';
import { NotificationToast } from './components/NotificationToast/NotificationToast';
import styles from './App.module.css';

function App() {
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
