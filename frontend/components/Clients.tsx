"use client";

import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow";
import { Client } from "@/types/Client";
import { GET_CLIENTS } from "@/graphql/queries/ClientQueries";
import Spinner from "./Spinner";

const Clients = ({}) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong</div>;

  const clients = data.clients as Client[];

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;
