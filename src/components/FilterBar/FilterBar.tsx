import { useAppDispatch, useAppSelector } from '../../store';
import { setPlatformFilter, setSearchQuery, clearFilters } from '../../store/filtersSlice';
import styles from './FilterBar.module.css';

export function FilterBar() {
  const dispatch = useAppDispatch();
  const platformFilter = useAppSelector((state) => state.filters.platformFilter);
  const searchQuery = useAppSelector((state) => state.filters.searchQuery);

  const platforms = ['', 'google', 'meta', 'tiktok'];

  return (
    <div className={styles.bar}>
      <div className={styles.section}>
        <label className={styles.label}>Platform</label>
        <div className={styles.buttonGroup}>
          {platforms.map((platform) => (
            <button
              key={platform || 'all'}
              className={`${styles.button} ${platformFilter === platform ? styles.active : ''}`}
              onClick={() => dispatch(setPlatformFilter(platform))}
            >
              {platform || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label} htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          className={styles.input}
          placeholder="Campaign name..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      {(platformFilter || searchQuery) && (
        <button className={styles.clear} onClick={() => dispatch(clearFilters())}>
          Clear Filters
        </button>
      )}
    </div>
  );
}
