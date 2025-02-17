import { FaSearch } from 'react-icons/fa';
import Upload from '../upload/Upload';
import AssetsList from './AssetsList';

const Assets = () => {
  return (
    <div className="flex flex-col gap-5 bg-base-100 rounded-lg shadow-md p-5 md:p-7">
      <div className="flex justify-between items-center">
        <Upload />
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <FaSearch />
        </label>
      </div>
      <AssetsList />
    </div>
  );
};

export default Assets;
