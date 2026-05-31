'use client';
import { usePathname } from 'next/navigation';

// Các path sẽ ẩn Header/Footer (standalone pages)
const STANDALONE_PATHS = ['/survey-page'];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = STANDALONE_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
  return <>{isStandalone ? null : children}</>;
}
