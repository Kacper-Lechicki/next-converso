'use client';

import { PricingTable } from '@clerk/nextjs';

import BackButton from '@/components/ui/back-button';

const SubscriptionPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <BackButton className="w-fit" />
      <PricingTable />
    </div>
  );
};

export default SubscriptionPage;
