import SelectIndustry from './SelectIndustry';

const UploadManuel = () => {
  return (
    <div className="flex flex-col gap-5 ">
      <SelectIndustry />

      <input
        type="text"
        placeholder="Enter data manually"
        className="input input-bordered"
      />
    </div>
  );
};

export default UploadManuel;
