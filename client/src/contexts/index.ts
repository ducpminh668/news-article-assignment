import React from 'react';

export const createNamedContext = <T>(contextName: string, initValue: T) => {
  const context = React.createContext<T>(initValue);

  context.displayName = contextName;

  return context;
};
