'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { SearchFilters } from '@/components/search-filter';
import { JobCard } from '@/components/job-card';
import { JobFilters } from '@/types';
import { getJobs } from '@/services';
import { showToast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

export interface Job {
  title: string;
  company: string;
  description: string;
}

const Jobs = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
  });

  const fetchJobs = async () => {
    try {
      const data = await getJobs();

      if (data.success) {
        setJobs(data.data);
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

  const filteredJobs = jobs.filter((job: any) =>
    job.title?.toLowerCase().includes(filters.search.toLowerCase()),
  );

  if (loading) return <p className="text-center py-12">Loading jobs...</p>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative py-20 px-4 bg-gradient-to-br from-hero-start to-hero-end bg-blue-600">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover amazing opportunities with top companies
          </p>

          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 bg-primary rounded flex items-center justify-center text-white text-sm font-bold">
                {filteredJobs.length}
              </span>
              Jobs Available
            </h2>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, i) => (
                <JobCard key={i} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Jobs;
