import { HTMLAttributes } from "react";

export type TableFlowImporterProps = HTMLAttributes<HTMLDialogElement> & {
    isOpen?: boolean;
    onRequestClose?: () => void;
    importerId: string;
    hostUrl?: string;
    darkMode?: boolean;
    primaryColor?: string;
    closeOnClickOutside?: boolean;
    metadata?: string;
};
