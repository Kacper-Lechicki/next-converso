'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import EmptyState from '@/components/feature/EmptyState';
import SubjectBadge from '@/components/feature/SubjectBadge';

import { ASSETS } from '@/config/assets';
import { cn } from '@/lib/utils';
import { Companion } from '@/types';

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateIcon?: string;
}

const CompanionsList = ({
  title,
  companions,
  classNames,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
}: CompanionsListProps) => {
  const t = useTranslations('CompanionsList');
  const router = useRouter();
  const displayTitle = title;
  const isEmpty = !companions || companions.length === 0;

  return (
    <article className={cn('companion-list flex flex-col', classNames)}>
      <h2 className="font-bold text-3xl">{displayTitle}</h2>

      {isEmpty ? (
        <EmptyState
          title={emptyStateTitle || t('no_sessions')}
          description={emptyStateDescription || t('no_sessions_description')}
          icon={emptyStateIcon || ASSETS.icons.clock}
          className="mt-8 border-none shadow-none h-auto flex-1 bg-transparent"
        />
      ) : (
        <Table className="mt-8">
          <TableHeader>
            <TableRow>
              <TableHead scope="col" className="text-lg w-2/3">
                {t('lessons')}
              </TableHead>

              <TableHead
                scope="col"
                className="text-lg text-center md:text-left"
              >
                {t('subject')}
              </TableHead>

              <TableHead scope="col" className="text-lg text-right">
                {t('duration')}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {companions?.map((companion: Companion) => (
              <TableRow
                key={companion.id}
                className="cursor-pointer"
                onClick={() => router.push(`/companions/${companion.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-4">
                    <SubjectBadge
                      subject={companion.subject}
                      classNames="size-[72px] max-md:hidden"
                      size={35}
                    />

                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl">{companion.name}</p>
                      <p className="text-sm">{companion.topic}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="subject-badge mx-auto md:mx-0 w-fit max-md:hidden">
                    {companion.subject}
                  </div>

                  <SubjectBadge
                    subject={companion.subject}
                    classNames="w-fit p-2 mx-auto md:mx-auto md:hidden"
                    size={18}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2 w-full justify-end">
                    <p className="text-sm font-bold">
                      {companion.duration}{' '}
                      <span className="max-md:sr-only">min</span>
                    </p>

                    <Image
                      src={ASSETS.icons.clock}
                      alt={t('clock_alt')}
                      width={14}
                      height={14}
                      className="w-[14px] h-[14px] md:hidden"
                      aria-hidden="true"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </article>
  );
};

export default CompanionsList;
