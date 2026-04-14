import { useCampaigns } from '../../api/campaigns'
import styles from './AtAGlanceBar.module.css'

export function AtAGlanceBar() {
  const { campaigns, isFetching, dataUpdatedAt } = useCampaigns()

  const totalSpend = campaigns.reduce((sum, camp) => sum + camp.totalSpend, 0)
  const avgConversionRate =
    campaigns.length > 0
      ? campaigns.reduce((sum, camp) => sum + camp.conversionRate, 0) / campaigns.length
      : 0

  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <div className={styles.label}>Total Spend</div>
        <div className={styles.value}>
          $
          {totalSpend.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className={styles.stat}>
        <div className={styles.label}>Avg Conversion Rate</div>
        <div className={styles.value}>{avgConversionRate.toFixed(2)}%</div>
      </div>

      <div className={styles.lastUpdated}>
        {isFetching
          ? 'Fetching...'
          : dataUpdatedAt > 0
            ? `Last updated: ${new Date(dataUpdatedAt).toLocaleString()}`
            : null}
      </div>
    </div>
  )
}
