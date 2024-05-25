import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import eventQueryService from '../../../features/query/eventQueryService';
import { usePushNotifications } from '../../../hooks/usePushNotifications';

const DataRefetcher: React.FC = () => {
  const { notification } = usePushNotifications();
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
        const notificationType = notification.request.content.categoryIdentifier;

      switch (notificationType) {
        case 'EventDetailPage':
          dispatch(eventQueryService.util.invalidateTags(['Events']));
          break;
        // Add more cases for other notification types if needed
        default:
          break;
      }
    }
  }, [notification, dispatch]);

  return null; // This component does not render anything
};

export default DataRefetcher;
