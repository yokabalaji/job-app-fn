import { Button } from '@/components/ui/button';
import { Briefcase, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  };
  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">JobBoard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Jobs
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild onClick={handleLogout}>
              <Link href="/login">Log out</Link>
            </Button>
            <Button asChild>
              <Link href="/create-job">
                <Plus className="w-4 h-4 mr-2" />
                Post Job
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
