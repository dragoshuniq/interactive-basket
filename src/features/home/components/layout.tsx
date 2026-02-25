import type { ReactNode } from "react";

export type LayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-zinc-100 text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Interactive Basket
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
            {subtitle}
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
