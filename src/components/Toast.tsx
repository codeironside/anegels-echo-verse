import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'bg-[rgb(var(--color-card))] text-[rgb(var(--color-text))]',
        duration: 4000,
        style: {
          background: 'rgb(var(--color-card))',
          color: 'rgb(var(--color-text))',
        },
      }}
    />
  );
};