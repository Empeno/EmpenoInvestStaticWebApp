import { useState } from 'react';
import UploadFile from './UploadFile';
import { MdUpload } from 'react-icons/md';

const Upload = () => {
  const [uploadModal, setUploadModal] = useState(false);

  const openUploadModal = () => {
    setUploadModal(true);
  };

  const closeUploadModal = () => {
    setUploadModal(false);
  };

  return (
    <>
      <button onClick={openUploadModal} className="btn btn-primary">
        <MdUpload size={17} /> Upload data
      </button>

      {uploadModal && (
        <div className="modal modal-open">
          <div className="modal-box p-10">
            <UploadFile closeModal={closeUploadModal} />
            <div className="modal-action"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Upload;
