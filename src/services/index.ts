import api from '@/lib/api';

export interface SignupPayload {
  name?: string;
  email: string;
  password: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface Job {
  title: string;
  company: string;
  description: string;
}

export async function signup(
  payload: SignupPayload = {
    name: 'Balaji',
    email: 'balaji@example.com',
    password: 'Secret@123',
  },
) {
  try {
    const response = await api.post('/users', payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Signup failed' };
  }
}

export async function login(
  payload: SigninPayload = {
    email: 'balaji@example.com',
    password: 'Secret@123',
  },
) {
  try {
    const response = await api.post('/login', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

export const getJobs = async () => {
  try {
    const response = await api.get('/jobs');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch jobs' };
  }
};

export const getJob = async (id: string) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch jobs' };
  }
};

export async function createJob(
  payload: Job = {
    title: 'Backend Developer',
    company: 'Tech Solutions Inc.',
    description:
      'Responsible for developing RESTful APIs and maintaining backend services using Node.js and NestJS.',
  },
) {
  try {
    const response = await api.post('/jobs', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
}
