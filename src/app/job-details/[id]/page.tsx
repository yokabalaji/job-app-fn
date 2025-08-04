'use client';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getJob } from '@/services';
import { showToast } from '@/lib/toast';

export interface Job {
  title: string;
  company: string;
  description: string;
}

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const data = await getJob(id as string);

      if (data.success) {
        setJob(data.data);
        showToast(data.message, 'success');
      }
    } catch (error: any) {
      showToast(error.message || 'Unable to load jobs', 'error');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
    fetchJobs();
  }, []);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <Link href="/">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  if (loading) return <p className="text-center py-12">Loading job...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Job Listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                    </div>
                    <p className="text-lg text-muted-foreground font-medium">{job.company}</p>
                  </div>
                </div>

                <div className="mb-8 flex justify-end">
                  <Button size="lg" className="w-full lg:w-auto">
                    Apply Now
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
