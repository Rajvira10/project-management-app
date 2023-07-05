import { DELETE_PROJECT } from "@/graphql/mutations/ProjectMutations";
import { GET_PROJECTS } from "@/graphql/queries/ProjectQueries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteProjectButtonProps {
  projectId: string;
}

const DeleteProjectButton: FC<DeleteProjectButtonProps> = ({ projectId }) => {
  const router = useRouter();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => {
      router.push("/");
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={() => deleteProject()}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};

export default DeleteProjectButton;
