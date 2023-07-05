"use client";

import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_CLIENT, GET_CLIENTS } from "@/graphql/queries/ClientQueries";
import Spinner from "./Spinner";
import { Client } from "@/types/Client";
import { ADD_PROJECT } from "@/graphql/mutations/ProjectMutations";
import { GET_PROJECTS } from "@/graphql/queries/ProjectQueries";

const AddProjectModal = ({}) => {
  const [alert, setAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      //@ts-ignore
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  if (loading) return null;

  if (error) console.log(error);

  const clients = data.clients as Client[];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!name || !description || !clientId) {
      setAlert(true);
    }

    //@ts-ignore
    addProject(name, description, clientId, status);
    setName("");
    setDescription("");
    setClientId("");
    setStatus("new");
    setIsOpen(false);
  };

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsOpen(true)}
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          {isOpen && (
            <div className="modal2-container">
              <div className="modal2">
                <div className="modal2-content">
                  <div className="modal2-header">
                    <h5 className="modal2-title">New Project</h5>
                    <button className="close" onClick={toggleModal}>
                      &times;
                    </button>
                  </div>
                  <div className="modal2-body">
                    <form>
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
                      <div className="mb-3">
                        <label className="form-label">Client </label>{" "}
                        <select
                          onChange={(e) => {
                            setAlert(false);
                            setClientId(e.target.value);
                          }}
                          className="form-label"
                          id="status"
                          value={clientId}
                        >
                          {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className="modal2-footer">
                    <button className="btn btn-light" onClick={toggleModal}>
                      Close
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => onSubmit(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <style jsx>{`
            .modal2-container {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgba(0, 0, 0, 0.5);
              z-index: 9999;
            }

            .modal2 {
              background-color: #fff;
              padding: 20px;
              max-width: 500px;
              width: 100%;
              border-radius: 4px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .modal2-content {
              margin-bottom: 20px;
            }

            .modal2-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }

            .modal2-title {
              margin: 0;
            }

            .modal2-body {
              margin-bottom: 10px;
            }

            .modal2-footer {
              display: flex;
              justify-content: flex-end;
              gap: 10px;
            }

            .close {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default AddProjectModal;
