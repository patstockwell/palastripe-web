import React, { useState } from 'react';

const ActivityHistoryLength = React.createContext<ConsumerValue>(null);

interface ConsumerValue {
  listLength: number;
  viewMore: () => void;
}

const PAGINATION_SIZE = 10;

const ActivityHistoryLengthProvider: React.FC = ({ children }) => {
  const [listLength, setListLength] = useState(PAGINATION_SIZE);
  const viewMore = () => setListLength(l => l + PAGINATION_SIZE);

  return (
    <ActivityHistoryLength.Provider value={{ listLength, viewMore }} >
      {children}
    </ActivityHistoryLength.Provider>
  );
};

const useActivityHistoryLength = () => {
  const context = React.useContext(ActivityHistoryLength);
  if (!context) {
    throw new Error('useActivityHistoryLength must be used within a ActivityHistoryLengthProvider');
  }

  return context;
};

export { ActivityHistoryLengthProvider, useActivityHistoryLength };
