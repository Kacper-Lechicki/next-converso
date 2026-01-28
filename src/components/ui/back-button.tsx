'use client';

import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  label?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  className?: string;
  onClick?: () => void;
}

const BackButton = ({
  label,
  variant = 'ghost',
  className,
  onClick,
}: BackButtonProps) => {
  const router = useRouter();
  const t = useTranslations('Common');

  return (
    <Button
      variant={variant}
      onClick={onClick || (() => router.back())}
      className={className}
    >
      <ArrowLeft className="h-4 w-4" />
      {label || t('back')}
    </Button>
  );
};

export default BackButton;
