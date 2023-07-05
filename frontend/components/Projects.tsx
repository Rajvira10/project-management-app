"use client";

import { FC } from "react";
import Spinner from "./Spinner";
import { GET_PROJECTS } from "@/graphql/queries/ProjectQueries";
import { useQuery } from "@apollo/client";
import { ProjectType } from "@/types/Project";
import ProjectCard from "./ProjectCard";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = ({}) => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const projects = data.projects as ProjectType[];

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
