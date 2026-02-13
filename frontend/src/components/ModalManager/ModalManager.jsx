import { useModal } from '../../context/ModalContext';
import AddToProjectModal from '../AddToProjectModal/AddToProjectModal';
import ComponentModal from "../ComponentModal/ComponentModal.jsx";
import ProjectModal from "../ProjectModal/ProjectModal.jsx";
import RenameProjectModal from "../RenameProjectModal/RenameProjectModal.jsx";
import RenameComponentModal from "../RenameComponentModal/RenameComponentModal.jsx";

export default function ModalManager() {
    const { modalState, closeModal } = useModal();

    const renderModal = () => {
        switch (modalState.type) {
            case 'addToProject':
                return <AddToProjectModal
                    onClose={closeModal}
                    {...modalState.props}
                />;
            case 'createProject':
                return <ProjectModal
                    onClose={closeModal}
                    {...modalState.props}
                />;
            case "createComponent":
                return <ComponentModal
                    onClose={closeModal}
                    {...modalState.props}
                />;
            case "renameProject":
                return <RenameProjectModal
                    onClose={closeModal}
                    {...modalState.props}
                />;
            case "renameComponent":
                return <RenameComponentModal
                    onClose={closeModal}
                    {...modalState.props}
                />;
            default:
                return null;
        }
    };

    if (!modalState.isOpen) return null;

    return renderModal();
}