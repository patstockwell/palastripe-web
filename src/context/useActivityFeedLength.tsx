import React, { useState } from 'react';

const ActivityFeedLength = React.createContext<ConsumerValue>(null);

interface ConsumerValue {
  listLength: number;
  viewMore: () => void;
}

const PAGINATION_SIZE = 10;

const ActivityFeedLengthProvider: React.FC = ({ children }) => {
  const [listLength, setListLength] = useState(PAGINATION_SIZE);
  const viewMore = () => setListLength(l => l + PAGINATION_SIZE);

  return (
    <ActivityFeedLength.Provider value={{ listLength, viewMore }} >
      {children}
    </ActivityFeedLength.Provider>
  );
};

const useActivityFeedLength = () => {
  const context = React.useContext(ActivityFeedLength);
  if (!context) {
    throw new Error('useActivityFeedLength must be used within a ActivityFeedLengthProvider');
  }

  return context;
};

export { ActivityFeedLengthProvider, useActivityFeedLength };
