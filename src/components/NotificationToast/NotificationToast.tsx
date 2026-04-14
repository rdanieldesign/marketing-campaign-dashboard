import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeNotification } from '../../store/uiSlice';
import styles from './NotificationToast.module.css';

const AUTO_DISMISS_MS = 4000;

export function NotificationToast() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  useEffect(() => {
    if (notifications.length === 0) return;

    const notificationId = notifications[notifications.length - 1].id;
    const timer = setTimeout(() => {
      dispatch(removeNotification(notificationId));
    }, AUTO_DISMISS_MS);

    return () => clearTimeout(timer);
  }, [notifications, dispatch]);

  if (notifications.length === 0) {
    return null;
  }

  const notification = notifications[notifications.length - 1];

  return (
    <div className={`${styles.toast} ${styles[notification.type]}`}>
      {notification.message}
    </div>
  );
}
