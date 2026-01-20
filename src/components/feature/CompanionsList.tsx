'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Companion } from '@/types';
import { cn } from '@/lib/utils';
import { ASSETS } from '@/constants/assets';
import SubjectBadge from '@/components/feature/SubjectBadge';

interface CompanionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}

const CompanionsList = ({
  title,
  companions,
  classNames,
}: CompanionsListProps) => {
  const t = useTranslations('CompanionsList');
  const displayTitle = title;

  return (
    <article className={cn('companion-list', classNames)}>
      <h2 className="font-bold text-3xl">{displayTitle}</h2>

      <Table className="mt-8">
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">{t('lessons')}</TableHead>
            <TableHead className="text-lg">{t('subject')}</TableHead>

            <TableHead className="text-lg text-right">
              {t('duration')}
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companions?.map((companion: Companion) => (
            <TableRow key={companion.id}>
              <TableCell>
                <Link href={`/companions/${companion.id}`}>
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
                </Link>
              </TableCell>

              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                  {companion.subject}
                </div>

                <SubjectBadge
                  subject={companion.subject}
                  classNames="w-fit p-2 md:hidden"
                  size={18}
                />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2 w-full justify-end">
                  <p className="text-sm font-bold">
                    {companion.duration}{' '}
                    <span className="max-md:hidden">mins</span>
                  </p>

                  <Image
                    src={ASSETS.icons.clock}
                    alt={t('clock_alt')}
                    width={14}
                    height={14}
                    className="w-[14px] h-[14px] md:hidden"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
