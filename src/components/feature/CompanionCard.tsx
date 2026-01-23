import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { ASSETS } from '@/config/assets';
import { Companion } from '@/types';

const CompanionCard = async ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: Companion) => {
  const t = await getTranslations('CompanionCard');

  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>

        <button
          type="button"
          className="companion-bookmark"
          aria-label={t('bookmark_alt')}
        >
          <Image
            src={ASSETS.icons.bookmark}
            alt={t('bookmark_alt')}
            width={25}
            height={30}
            className="w-[12.5px] h-[15px]"
            aria-hidden="true"
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
          aria-hidden="true"
        />
        <p className="text-sm font-bold">
          {duration} {t('minutes')}
        </p>
      </div>

      <Link
        href={`/companions/${id}`}
        className="btn-primary h-12 w-full flex justify-center items-center"
      >
        {t('launch_lesson')}
      </Link>
    </article>
  );
};

export default CompanionCard;
