import { useCampaigns } from '../../api/campaigns';
import { CampaignRow } from '../CampaignRow/CampaignRow';
import styles from './CampaignList.module.css';

export function CampaignList() {
  const { campaigns, isLoading, error } = useCampaigns();

  if (isLoading) {
    return (
      <div className={styles.list}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load campaigns. Please try again.</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No campaigns found.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.name}>Campaign Name</div>
        <div className={styles.platform}>Platform</div>
        <div className={styles.spend}>Total Spend</div>
        <div className={styles.budget}>Daily Budget</div>
        <div className={styles.badge}>Status</div>
        <div className={styles.rate}>Conv. Rate</div>
        <div className={styles.action}>Action</div>
      </div>
      {campaigns.map((campaign) => (
        <CampaignRow key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
