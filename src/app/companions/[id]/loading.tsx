import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8 text-muted-foreground/50">
      <Spinner size="lg" className="animate-in fade-in zoom-in duration-300" />
    </div>
  );
}
