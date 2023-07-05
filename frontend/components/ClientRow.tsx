import { DELETE_CLIENT } from "@/graphql/mutations/ClientMutations";
import { GET_CLIENTS } from "@/graphql/queries/ClientQueries";
import { Client } from "@/types/Client";
import { useMutation } from "@apollo/client";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

interface ClientRowProps {
  client: Client;
}

const ClientRow: FC<ClientRowProps> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      // @ts-ignore
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter(
            (client: Client) => client.id !== deleteClient.id
          ),
        },
      });
    },
  });

  return (
    <tr>
      <td>{client.name}</td> <td>{client.name}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient()}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
