import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children } = props;

  return <div className={'max-w-[1200px] m-auto px-4'}>{children}</div>;
};
