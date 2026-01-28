'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { deleteCompanion } from '@/actions/companion';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/ui/confirm-modal';
import { useServerAction } from '@/hooks/use-server-action';

interface CompanionActionsProps {
  companionId: string;
}

const CompanionActions = ({ companionId }: CompanionActionsProps) => {
  const router = useRouter();
  const t = useTranslations('CompanionActions');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { run: deleteCompanionAction } = useServerAction(deleteCompanion);

  const handleDelete = async () => {
    await deleteCompanionAction(companionId, {
      onSuccess: () => {
        toast.success(t('companion_deleted'));
        router.push('/companions');
      },
      onError: () => {
        toast.error(t('delete_failed'));
      },
    });

    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:bg-black/10"
        >
          <Link href={`/companions/${companionId}/edit`} aria-label={t('edit')}>
            <Pencil className="size-4" />
          </Link>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label={t('delete')}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={t('delete_title')}
        description={t('delete_description')}
        confirmText={t('delete_confirm')}
        cancelText={t('cancel')}
        isDestructive
      />
    </>
  );
};

export default CompanionActions;
