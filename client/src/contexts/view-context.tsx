import React, { useState } from 'react';
import { noop } from '~/utils/common';
import { createNamedContext } from '.';

export interface IView {
  view: 'grid' | 'list';
  setView: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  clear: () => void;
}

const initalValue: IView = {
  view: 'list',
  setView: noop,
  clear: noop
};

export const ViewContext = createNamedContext<IView>('view', initalValue);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [view, setView] = useState<'list' | 'grid'>('list');

  const clear = () => {
    setView('list');
  };
  return (
    <ViewContext.Provider value={{ view, setView, clear }}>
      {children}
    </ViewContext.Provider>
  );
};
