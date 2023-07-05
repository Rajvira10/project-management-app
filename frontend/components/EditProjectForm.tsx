import { UPDATE_PROJECT } from "@/graphql/mutations/ProjectMutations";
import { GET_PROJECT } from "@/graphql/queries/ProjectQueries";
import { ProjectType } from "@/types/Project";
import { useMutation } from "@apollo/client";
import { FC, useState } from "react";

interface EditProjectFormProps {
  project: ProjectType;
}

const EditProjectForm: FC<EditProjectFormProps> = ({ project }) => {
  const [name, setName] = useState(project.name || "");
  const [description, setDescription] = useState(project.description || "");

  let condition = "";
  if (project.status == "Not Started") {
    condition = "new";
  } else if (project.status == "In Progress") {
    condition = "progress";
  } else {
    condition = "completed";
  }
  const [status, setStatus] = useState(condition);

  const [alert, setAlert] = useState(false);

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !description) {
      setAlert(true);
    }

    //@ts-ignore
    updateProject(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          {alert && (
            <div className="alert alert-danger" role="alert">
              Please fill in all the fields
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => {
              setAlert(false);
              setName(e.target.value);
            }}
          />{" "}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => {
              setAlert(false);
              setDescription(e.target.value);
            }}
          />{" "}
        </div>
        <div className="mb-3">
          <label className="form-label">Status </label>{" "}
          <select
            onChange={(e) => {
              setAlert(false);
              setStatus(e.target.value);
            }}
            className="form-label"
            id="status"
            value={status}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
