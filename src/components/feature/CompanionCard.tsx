'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ASSETS } from '@/constants/assets';
import { Companion } from '@/types';

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: Companion) => {
  const t = useTranslations('CompanionCard');

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>

        <button type="button" className="companion-bookmark">
          <Image
            src={ASSETS.icons.bookmark}
            alt={t('bookmark_alt')}
            width={25}
            height={30}
            className="w-[12.5px] h-[15px]"
          />
        </button>
      </div>

      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>

      <div className="flex items-center gap-2">
        <Image
          src={ASSETS.icons.clock}
          alt={t('duration_alt')}
          width={27}
          height={27}
          className="w-[13.5px] h-[13.5px]"
        />
        <p className="text-sm font-bold">
          {duration} {t('minutes')}
        </p>
      </div>

      <Link
        href={`/companions/${id}`}
        className="btn-primary w-full flex justify-center items-center"
      >
        {t('launch_lesson')}
      </Link>
    </article>
  );
};

export default CompanionCard;
