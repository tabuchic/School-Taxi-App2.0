// src/contexts/AppContext.ts
import React, { createContext, useContext, useEffect, useState } from 'react';
import db from '@/firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface TaxiState {
  selectedColors: boolean[];
  textField1: string;
  textField2: string;
  taxiNames: string[];
}

interface AppContextProps {
  taxiState: TaxiState;
  updateSelectedColors: (colors: boolean[]) => void;
  updateTextField1: (text: string) => void;
  updateTextField2: (text: string) => void;
  updateTaxiName: (index: number, name: string) => void;
  resetPassword: (newPassword: string) => void; // Stub implementation
  checkPassword: (input: string) => boolean;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  updateFirestore: (newState: Partial<TaxiState>) => void;
}

const defaultState: TaxiState = {
  selectedColors: new Array(24).fill(false),
  textField1: '',
  textField2: '',
  taxiNames: new Array(24).fill('').map((_, i) => `Taxi ${i + 1}`),
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taxiState, setTaxiState] = useState<TaxiState>(defaultState);
  const DOC_REF = doc(db, 'state', 'taxi');
  const [isAdmin, setIsAdmin] = useState(false); 

  // Sync Firestore to state
  useEffect(() => {
    const unsubscribe = onSnapshot(DOC_REF, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setTaxiState({
          selectedColors: data.selectedColors || defaultState.selectedColors,
          textField1: data.textField1 || '',
          textField2: data.textField2 || '',
          taxiNames: data.taxiNames || defaultState.taxiNames,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore update helpers
  const updateFirestore = async (newState: Partial<TaxiState>) => {
  const updatedState = { ...taxiState, ...newState };
  setTaxiState(updatedState); // local update
  try {
    await setDoc(DOC_REF, updatedState); // remote update
  } catch (err) {
    console.error('Failed to update Firestore:', err);
  }
  };

  const updateSelectedColors = (colors: boolean[]) => {
    updateFirestore({ selectedColors: colors });
  };

  const updateTextField1 = (text: string) => {
    updateFirestore({ textField1: text });
  };

  const updateTextField2 = (text: string) => {
    updateFirestore({ textField2: text });
  };

  const updateTaxiName = (index: number, name: string) => {
    const newNames = [...taxiState.taxiNames];
    newNames[index] = name;
    updateFirestore({ taxiNames: newNames });
  };

  const resetPassword = (newPassword: string) => {
    // Add actual secure password update logic if needed
    console.log(`Password reset to: ${newPassword}`);
  };

  const checkPassword = (input: string) => {
  return input === 'admin123'; // 🔐 You can improve this later
};

  return (
    <AppContext.Provider
      value={{
        taxiState,
        updateSelectedColors,
        updateTextField1,
        updateTextField2,
        updateTaxiName,
        resetPassword,
        checkPassword,
        isAdmin,      
        setIsAdmin, 
        updateFirestore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
