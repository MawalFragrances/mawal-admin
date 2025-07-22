import { create } from "zustand";

const useComponentStore = create((set) => ({


    displayAddNewAdmin: false,
    setDisplayAddNewAdmin: (displayAddNewAdmin) => (set({ displayAddNewAdmin })),

    // DELETION CONFIRMATION
    confirmationPrompt: "",
    btnLabel: "",
    onYesButtonClick: () => { },
    displayConfirmation: false,
    setDisplayConfirmation: (displayConfirmation) => (set({ displayConfirmation })),

    confirmAction: (confirmationPrompt, btnLabel, onYesButtonClick) => {
        set({ confirmationPrompt });
        set({ btnLabel });
        set({ onYesButtonClick });
        set({ displayConfirmation: true });
    },

}))

export default useComponentStore;