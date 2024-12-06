// SelectionContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectionContextType {
  selectedItems: Set<string>;
  toggleSelection: (item: string) => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

interface SelectionProviderProps {
  children: ReactNode;
}

export const SelectionProvider: React.FC<SelectionProviderProps> = ({ children}) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (item: string) => {
    const updatedSelection = new Set(selectedItems);
    if (updatedSelection.has(item)) {
      updatedSelection.delete(item);
    } else {
      updatedSelection.add(item);
    }
    setSelectedItems(updatedSelection);
  };

  return (
    <SelectionContext.Provider value={{ selectedItems, toggleSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelectionContext = (): SelectionContextType => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelectionContext must be used within a SelectionProvider');
  }
  return context;
};