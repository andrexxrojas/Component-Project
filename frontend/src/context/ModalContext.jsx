import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        data: null,
    });

    const openModal = (type, data = null) => {
        setModalState({
            isOpen: true,
            type,
            data,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            type: null,
            data: null,
        });
    };

    return (
        <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};