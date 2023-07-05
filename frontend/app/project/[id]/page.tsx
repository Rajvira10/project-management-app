"use client";
import ClientInfo from "@/components/ClientInfo";
import Spinner from "@/components/Spinner";
import { GET_PROJECT } from "@/graphql/queries/ProjectQueries";
import { ProjectType } from "@/types/Project";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Project = ({ params }: any) => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: params.id },
  });

  if (loading) return <Spinner />;
  if (error) return router.push("/not-found");

  const project = data.project as ProjectType;
  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link href="/" className="d-inline w-25 btn btn-light btn-sm ms-auto">
            Back
          </Link>
          <h1>{project.name}</h1>
          <p>{project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />
        </div>
      )}
    </>
  );
};

export default Project;
