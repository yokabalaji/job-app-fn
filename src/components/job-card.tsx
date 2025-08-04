import { Card, CardContent, CardHeader } from './ui/card';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface JobCardProps {
  job: SimpleJob;
}

interface SimpleJob {
  _id: string;
  title: string;
  company: string;
  description: string;
}

export const JobCard = ({ job }: JobCardProps) => {

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">{job.title}</h3>
            <p className="text-muted-foreground font-medium">{job.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
        <div className="text-end">
          <Link href={`/job-details/${job._id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
