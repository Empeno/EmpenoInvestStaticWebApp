import { useState } from 'react';

import UploadManuel from './components/UploadManuel';
import UploadFile from './components/UploadFile';

const Upload = () => {
  const [isManual, setIsManual] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <span className="text-xl font-bold">Upload new data</span>
      <div className="flex gap-5">
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            name="radio-1"
            className="radio"
            defaultChecked={!isManual}
            onChange={() => setIsManual(false)}
          />
          <span className="text-lg">File</span>
        </label>
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            name="radio-1"
            className="radio"
            defaultChecked={isManual}
            onChange={() => setIsManual(true)}
          />
          <span className="text-lg">Manuel</span>
        </label>
      </div>
      <div className="flex flex-col gap-5">
        {isManual ? <UploadManuel /> : <UploadFile />}
      </div>
    </div>
  );
};

export default Upload;
