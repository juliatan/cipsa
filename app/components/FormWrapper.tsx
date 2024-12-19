import { Form } from './Form';

const getFormOptions = async () => {
  try {
    const response = await fetch(`${process.env.DOMAIN}/api/form-options`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch form options');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching form options:', error);
    return { options: { drivers: [] }, playerNames: [] };
  }
};

export const FormWrapper = async () => {
  const { options, playerNames } = await getFormOptions();

  return <Form drivers={options.drivers || []} players={playerNames || []} />;
};
