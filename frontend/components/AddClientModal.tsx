"use client";

import { FC, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT, GET_CLIENTS } from "@/graphql/queries/ClientQueries";

interface AddClientModalProps {}

const AddClientModal: FC<AddClientModalProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alert, setAlert] = useState(false);

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      //@ts-ignore
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      setAlert(true);
    }
    // @ts-ignore
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setIsOpen(true)}
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>
      {isOpen && (
        <div className="modal2-container">
          <div className="modal2">
            <div className="modal2-content">
              <div className="modal2-header">
                <h5 className="modal2-title">Add Client</h5>
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
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setAlert(false);
                        setEmail(e.target.value);
                      }}
                    />{" "}
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => {
                        setAlert(false);
                        setPhone(e.target.value);
                      }}
                    />
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
  );
};

export default AddClientModal;
