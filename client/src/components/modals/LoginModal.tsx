import { useState } from "react";
import Login from "../auth/Login";
const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="btn  flex justify-start" onClick={() => setShowModal(true)}>
        Admin Login
      </button>

      {showModal && (
        <div className="modal modal-open ">
          <div className="modal-box w-auto max-w-5xl flex flex-col gap-2 md:p-12 ">
            <h3 className="font-bold text-xl">Admin Login</h3>
            <div className="modal-action">
              <Login setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
