import { useState, useCallback } from 'react';

// Generic modal hook for managing modal state
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Re-enable body scroll when modal is closed
    document.body.style.overflow = 'unset';
  }, []);

  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, openModal, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
}

// Multi-modal hook for managing multiple modal states
export function useMultiModal<T extends string>(modalNames: readonly T[]) {
  const [openModals, setOpenModals] = useState<Set<T>>(new Set());

  const openModal = useCallback((modalName: T) => {
    setOpenModals(prev => new Set([...prev, modalName]));
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback((modalName: T) => {
    setOpenModals(prev => {
      const newSet = new Set(prev);
      newSet.delete(modalName);
      if (newSet.size === 0) {
        document.body.style.overflow = 'unset';
      }
      return newSet;
    });
  }, []);

  const closeAllModals = useCallback(() => {
    setOpenModals(new Set());
    document.body.style.overflow = 'unset';
  }, []);

  const isModalOpen = useCallback((modalName: T) => {
    return openModals.has(modalName);
  }, [openModals]);

  const toggleModal = useCallback((modalName: T) => {
    if (isModalOpen(modalName)) {
      closeModal(modalName);
    } else {
      openModal(modalName);
    }
  }, [isModalOpen, openModal, closeModal]);

  return {
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    toggleModal,
    hasOpenModals: openModals.size > 0
  };
}