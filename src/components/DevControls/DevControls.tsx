import { useAppDispatch, useAppSelector } from '../../store'
import { setSimulateError } from '../../store/uiSlice'
import styles from './DevControls.module.css'

export function DevControls() {
  const dispatch = useAppDispatch()
  const simulateError = useAppSelector((state) => state.ui.simulateError)

  // Only render in development and test, not production
  if (!import.meta.env.DEV) {
    return null
  }

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSimulateError(e.target.checked))
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>Dev Controls</h2>
      <label className={styles.checkboxLabel}>
        <input type="checkbox" checked={simulateError} onChange={handleToggle} />
        Simulate API Failure
      </label>
      {simulateError && (
        <p className={styles.warning}>
          ⚠️ API failure simulation enabled. Toggling campaigns will fail.
        </p>
      )}
    </div>
  )
}
