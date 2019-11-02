import React from 'react';

const PageRefContext = React.createContext<
  React.MutableRefObject<HTMLDivElement>
>(null);

interface Props {
  value: React.MutableRefObject<HTMLDivElement>;
}

const PageRefProvider: React.FC<Props> = ({ value, children }) => {
  return (
    <PageRefContext.Provider value={value}>
      {children}
    </PageRefContext.Provider>
  );
};

const usePageRef = () => {
  const context = React.useContext(PageRefContext);
  if (context === undefined) {
    throw new Error('usePageRef must be used within a PageRefProvider');
  }

  return context;
};

export { PageRefProvider, usePageRef };
