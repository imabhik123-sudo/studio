import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-6 w-6', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.5 2.5a2.5 2.5 0 0 1 2.5 2.5v14a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1-2.5-2.5V5a2.5 2.5 0 0 1 2.5-2.5h3Z" />
      <path d="M10.5 14H8" />
      <path d="M10.5 10H8" />
      <path d="M10.5 6H8" />
    </svg>
  );
}
