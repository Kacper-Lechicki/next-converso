import { SignIn } from '@clerk/nextjs';

import BackButton from '@/components/ui/back-button';

const SignInPage = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center py-24 gap-6">
      <div className="w-full max-w-[600px]">
        <BackButton />
      </div>
      <SignIn
        appearance={{
          elements: {
            rootBox: '!w-full',
            cardBox: '!max-w-[600px]',
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
