import { Modal, useGeneralStore } from "../stores/generalStore";

function useModal(modalType: Modal) {
    // By putting this into hook, we don't need to write those logic again, again... 
    const activeModal = useGeneralStore((state) => state.activeModal);
    const setActiveModal = useGeneralStore((state) => state.setActiveModal);

    const isOpen: boolean = activeModal === modalType;

    const openModal = () => {
        setActiveModal(modalType);
    }

    const closeModal = () => {
        setActiveModal(null);
    }

    // return from this hook:
    return {
        isOpen,
        openModal,
        closeModal,
    }

}
