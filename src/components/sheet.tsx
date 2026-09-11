import type { ReactNode } from "react";
import { X } from "lucide-react";

export function Sheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        aria-label="Close"
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-[4px] transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed bottom-0 left-1/2 z-50 flex max-h-[88dvh] w-full max-w-[430px] -translate-x-1/2 flex-col overflow-y-auto rounded-t-[22px] border border-b-0 border-border bg-surface px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-border" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center rounded-full border border-border bg-surface-2 text-muted"
          aria-label="Close"
        >
          <X className="size-4" />
        </button>
        <h2 className="mb-3.5 text-lg font-bold tracking-tight text-fg">{title}</h2>
        {children}
      </div>
    </>
  );
}
