import { useCallback, useRef, useState } from 'react';

export const useDialog = ({ defaultState = false, defaultValue = null } = {}) => {
    const [open, setOpen] = useState(defaultState);
    const value = useRef(defaultValue);
    const onOpen = useCallback((v = null) => {
        setOpen(true);
        value.current = v;
    }, []);
    const onClose = useCallback(() => {
        setOpen(false);
        value.current = null;
    }, []);
    const onToggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return {
        open,
        onOpen,
        onClose,
        onToggle,
    };
};
