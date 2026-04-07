import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import { createJob, deleteJob as deleteJobApi, updateJob as updateJobApi } from "./services/apiServices";

const App = () => {
  const addJob = async (newJob) => {
    try {
      await createJob(newJob);
      console.log("Job created successfully");
    } catch (error) {
      console.error("Failed to create job:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await deleteJobApi(id);
      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const updateJob = async (job) => {
    try {
      await updateJobApi(job.id, job);
      console.log("Job updated successfully");
    } catch (error) {
      console.error("Failed to update job:", error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );
  return <RouterProvider router={router} />;
};

export default App;
