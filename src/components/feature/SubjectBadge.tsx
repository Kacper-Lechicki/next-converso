import Image from 'next/image';

import { ASSETS } from '@/constants/assets';
import { cn, getSubjectColor } from '@/lib/utils';
import { Subject } from '@/types';

interface SubjectBadgeProps {
  subject: Subject | string;
  classNames?: string;
  size: number;
}

const SubjectBadge = ({
  subject,
  classNames,
  size = 35,
}: SubjectBadgeProps) => {
  const iconSrc =
    (ASSETS.subjects as Record<string, string>)[subject] ||
    `/icons/${subject}.svg`;

  return (
    <div
      className={cn('flex items-center justify-center rounded-lg', classNames)}
      style={{
        backgroundColor: getSubjectColor(subject),
      }}
    >
      <Image
        src={iconSrc}
        alt={subject}
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    </div>
  );
};

export default SubjectBadge;
