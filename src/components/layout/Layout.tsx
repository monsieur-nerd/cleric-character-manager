import type { ReactNode } from 'react';
import { TabBar } from './TabBar';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-parchment flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 pt-16 overflow-x-hidden">
        {children}
      </main>
      
      <TabBar />
    </div>
  );
}
