const UploadFile = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="flex flex-col gap-10">
      <h3 className="font-bold text-2xl flex items-center gap-3">
        Upload new data
      </h3>
      <form action="" className="form-control flex flex-col gap-5 items-start">
        <input type="file" className="file-input file-input-bordered" />
        <div className="flex gap-5 mt-5">
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
          <button className="btn" onClick={closeModal}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadFile;
