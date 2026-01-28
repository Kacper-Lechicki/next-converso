'use client';

import CompanionForm, {
  CompanionFormProps,
} from '@/components/feature/CompanionForm';
import BackButton from '@/components/ui/back-button';
import { COMPANION_PAGE_DOTS } from '@/config/app';
import { useNavigationGuard } from '@/hooks/use-navigation-guard';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DotsVisual = ({ className }: { className?: string }) => (
  <div className={`relative w-full h-full overflow-hidden ${className}`}>
    {COMPANION_PAGE_DOTS.map((dot, index) => (
      <div
        key={index}
        className={`absolute rounded-full ${dot.size}`}
        style={{
          backgroundColor: dot.color,
          top: dot.top,
          left: dot.left,
          opacity: 0.8,
        }}
      />
    ))}
  </div>
);

interface CompanionEditorProps extends CompanionFormProps {
  title: string;
}

const CompanionEditor = ({
  title,
  initialData,
  companionId,
  callbackUrl,
}: CompanionEditorProps) => {
  const [isDirty, setIsDirty] = useState(false);
  const router = useRouter();
  const t = useTranslations('CompanionEditor');

  const { handleAction, GuardModal } = useNavigationGuard({
    shouldPrevent: isDirty,
    title: t('unsaved_changes_title'),
    description: t('unsaved_changes_description'),
    confirmText: t('leave'),
    cancelText: t('stay'),
  });

  return (
    <div className="flex w-full min-h-full flex-col lg:flex-row gap-8 lg:gap-24 relative isolate">
      {GuardModal}

      <div className="absolute inset-0 lg:hidden z-0 overflow-hidden pointer-events-none">
        <DotsVisual />
      </div>

      <section className="flex flex-col gap-6 w-full lg:w-1/2 relative z-10">
        <div className="w-fit">
          <BackButton
            onClick={() =>
              handleAction(() => {
                if (callbackUrl) {
                  router.push(callbackUrl);
                } else {
                  router.back();
                }
              })
            }
          />
        </div>

        <h1 className="text-3xl font-bold">{title}</h1>

        <CompanionForm
          initialData={initialData}
          companionId={companionId}
          onDirtyChange={setIsDirty}
          callbackUrl={callbackUrl}
        />
      </section>

      <section className="hidden lg:flex w-1/2 min-h-full relative overflow-hidden items-center justify-center p-8 pointer-events-none">
        <div className="absolute inset-0">
          <DotsVisual />
        </div>
      </section>
    </div>
  );
};

export default CompanionEditor;
