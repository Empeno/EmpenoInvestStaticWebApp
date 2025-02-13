import { useState } from 'react';
import ListCompanies from './companies/ListCompanies';
import ListIndustries from './industries/ListIndustries';

const ListNav = () => {
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <div className="max-w-f lg:max-w-lg flex flex-col gap-10">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'companies' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('companies')}
        >
          Companies
        </button>
        <button
          className={`tab ${activeTab === 'industries' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('industries')}
        >
          Industries
        </button>
      </div>

      <div className="">
        {activeTab === 'companies' && <ListCompanies />}
        {activeTab === 'industries' && <ListIndustries />}
      </div>
    </div>
  );
};

export default ListNav;
