'use client';

import { useCallback, useEffect, useState } from 'react';

import ConfirmModal from '@/components/ui/confirm-modal';

interface UseNavigationGuardProps {
  shouldPrevent: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export const useNavigationGuard = ({
  shouldPrevent,
  title,
  description,
  confirmText = 'Leave',
  cancelText = 'Stay',
}: UseNavigationGuardProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldPrevent) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    if (shouldPrevent) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [shouldPrevent]);

  const handleAction = useCallback(
    (action: () => void) => {
      if (shouldPrevent) {
        setPendingAction(() => action);
        setShowConfirm(true);
      } else {
        action();
      }
    },
    [shouldPrevent],
  );

  const handleConfirm = useCallback(() => {
    if (pendingAction) {
      pendingAction();
    }

    setShowConfirm(false);
    setPendingAction(null);
  }, [pendingAction]);

  const handleClose = useCallback(() => {
    setShowConfirm(false);
    setPendingAction(null);
  }, []);

  const GuardModal = (
    <ConfirmModal
      isOpen={showConfirm}
      onClose={handleClose}
      onConfirm={handleConfirm}
      title={title}
      description={description}
      confirmText={confirmText}
      cancelText={cancelText}
      isDestructive={true}
    />
  );

  return { handleAction, GuardModal };
};
