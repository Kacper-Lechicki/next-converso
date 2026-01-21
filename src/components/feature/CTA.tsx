'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { ASSETS } from '@/constants/assets';

const CTA = () => {
  const t = useTranslations('CTA');

  return (
    <section className="cta-section">
      <div className="cta-badge">{t('start_learning')}</div>
      <h2 className="text-3xl font-bold">{t('build_and_personalize')}</h2>
      <p>{t('description')}</p>

      <Image
        src={ASSETS.images.cta}
        alt={t('cta_alt')}
        width={362}
        height={232}
        priority
        fetchPriority="high"
      />

      <button className="btn-primary" type="button">
        <Image
          src={ASSETS.icons.plus}
          alt={t('plus_alt')}
          width={12}
          height={12}
          className="w-[12px] h-[12px]"
        />

        <Link href="/companions/new">
          <p>{t('build_new_companion')}</p>
        </Link>
      </button>
    </section>
  );
};

export default CTA;
