import type { Campaign } from '../../api/types';
import { useToggleCampaign } from '../../api/campaigns';
import { useAppSelector } from '../../store';
import styles from './CampaignRow.module.css';

interface CampaignRowProps {
  campaign: Campaign;
}

export function CampaignRow({ campaign }: CampaignRowProps) {
  const { mutate: toggleCampaign } = useToggleCampaign();
  const isSaving = useAppSelector((state) => state.ui.savingIds.includes(campaign.id));
  const hasError = useAppSelector((state) => state.ui.errorIds.includes(campaign.id));

  const isOverBudget = campaign.totalSpend > campaign.dailyBudget;
  const newStatus = campaign.status === 'active' ? 'paused' : 'active';

  const handleToggle = () => {
    if (!isSaving) {
      toggleCampaign({ id: campaign.id, newStatus });
    }
  };

  return (
    <div className={`${styles.row} ${hasError ? styles.error : ''}`}>
      <div className={styles.name}>{campaign.name}</div>
      <div className={styles.platform}>{campaign.platform}</div>
      <div className={styles.spend}>${campaign.totalSpend.toFixed(2)}</div>
      <div className={styles.budget}>${campaign.dailyBudget.toFixed(2)}</div>
      <div className={styles.badge}>
        {isOverBudget && <span className={styles.warning}>Budget Warning</span>}
      </div>
      <div className={styles.rate}>{campaign.conversionRate.toFixed(2)}%</div>
      <div className={styles.status}>
        <button
          className={`${styles.button} ${campaign.status === 'active' ? styles.active : styles.paused}`}
          onClick={handleToggle}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : campaign.status}
        </button>
      </div>
      {hasError && <div className={styles.errorMessage}>Update failed</div>}
    </div>
  );
}
