'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { ASSETS } from '@/config/assets';

const SearchInput = () => {
  const t = useTranslations('SearchInput');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = (query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set('topic', query);
      } else {
        params.delete('topic');
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);
  };

  return (
    <div className="h-12 relative border border-black rounded-md items-center flex gap-2 px-3 py-2 w-full">
      <Image
        src={ASSETS.icons.search}
        alt={t('search_alt')}
        width={15}
        height={15}
        className="w-[15px] h-[15px]"
      />

      <input
        placeholder={t('placeholder')}
        className="outline-none text-sm w-full"
        defaultValue={searchParams.get('topic') || ''}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
