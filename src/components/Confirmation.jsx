// REACT
import { useState } from "react";
// COMPONENTS
import { ThemeButton } from "../components/Buttons"
// ZUSTAND
import useComponentStore from "../zustand/component.store";

function Confirmation() {

    const [isDeleting, setIsDeleting] = useState(false);
    const { confirmationPrompt, setDisplayConfirmation, onYesButtonClick, btnLabel } = useComponentStore();

    const handleDeleteButtonClick = async () => {

        setIsDeleting(true);
        await onYesButtonClick();
        setIsDeleting(false);

        setDisplayConfirmation(false);
    }

    return (
        // BLACK BACKGROUND
        <div className="fixed top-0 left-0 h-screen w-full bg-black/70 flex items-center justify-center z-[990]">

            {/* CONFIRM DELETION CONTAINER */}
            <div className="animate-themeAnimationLg bg-white w-[90vw] max-w-[90vw] md:max-w-[35vw] rounded-md border-2 border-black">

                <h4 className="text-lg font-black text-red-500 text-center pt-3 pb-1 border-b">
                    CONFIRM YOUR ACTION
                </h4>

                <p className="pt-5 pb-8 px-8 font-medium" >
                    {confirmationPrompt}
                </p>

                {/* CANCEL & DELETE BUTTONS */}
                <div className="w-full flex items-center justify-end pb-4 px-8 gap-4">

                    {/* CANCEL BUTTON */}
                    <ThemeButton
                        btnLabel="CANCEL"
                        extraClasses="w-[100px]"
                        onClick={() => setDisplayConfirmation(false)}
                    />

                    {/* DELETE BUTTON */}
                    <ThemeButton
                        btnLabel={btnLabel}
                        extraClasses="min-w-[100px]"
                        isButtonLoading={isDeleting}
                        onClick={handleDeleteButtonClick}
                    />

                </div>

            </div>

        </div>
    )
}

export default Confirmation;