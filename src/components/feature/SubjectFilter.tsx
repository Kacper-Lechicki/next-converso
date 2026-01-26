'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { SUBJECTS } from '@/config/app';
import { Subject } from '@/types';

const SubjectFilter = () => {
  const t = useTranslations('SubjectFilter');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSubject = searchParams.get('subject') || '';

  const onSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete('subject');
    } else {
      params.set('subject', value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select onValueChange={onSelect} value={activeSubject}>
      <SelectTrigger className="border-black bg-white focus-visible:ring-0 focus-visible:border-black capitalize w-full sm:w-[180px]">
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">{t('all_subjects')}</SelectItem>
        {SUBJECTS.map((subject: Subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {t(subject)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
