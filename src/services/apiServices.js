import axios from 'axios';

// const API_BASE_URL = '/api';
const API_BASE_URL = 'https://my-json-server.typicode.com/furkanmemon/react-job-portal';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all jobs
export const getJobs = async () => {
  try {
    const response = await apiClient.get('/jobs');
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

// Get a single job by ID
export const getJobById = async (id) => {
  try {
    const response = await apiClient.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    throw error;
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

// Update an existing job
export const updateJob = async (id, jobData) => {
  try {
    const response = await apiClient.put(`/jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    console.error(`Error updating job with ID ${id}:`, error);
    throw error;
  }
};

// Delete a job
export const deleteJob = async (id) => {
  try {
    const response = await apiClient.delete(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting job with ID ${id}:`, error);
    throw error;
  }
};
