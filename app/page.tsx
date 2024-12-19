import { FormWrapper } from '@/app/components/FormWrapper';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Race Results Submission
      </h1>
      <Suspense fallback={<p>Loading</p>}>
        <FormWrapper />
      </Suspense>
    </main>
  );
}
