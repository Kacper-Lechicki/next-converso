import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 rounded-4xl border border-black bg-white gap-4 w-full h-full min-h-[300px]',
        className,
      )}
    >
      {icon && (
        <div className="bg-gray-100 p-4 rounded-full mb-2">
          <Image
            src={icon}
            alt=""
            width={48}
            height={48}
            className="opacity-50"
            aria-hidden="true"
          />
        </div>
      )}

      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground max-w-md">{description}</p>

      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn-primary mt-4">
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
