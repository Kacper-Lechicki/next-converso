import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="flex w-full items-center justify-center py-24">
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
