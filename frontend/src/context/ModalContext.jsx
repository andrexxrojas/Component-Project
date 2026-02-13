import { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        props: null,
    });

    const openModal = (type, props = null) => {
        setModalState({
            isOpen: true,
            type,
            props,
        });
    };

    const closeModal = () => {
        setModalState({
            isOpen: false,
            type: null,
            props: null,
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