import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center py-10">
      <Spinner size="lg" className="animate-in fade-in zoom-in duration-300" />
    </div>
  );
}
