import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="flex w-full items-center justify-center py-24">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-background shadow-none border border-border',
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
