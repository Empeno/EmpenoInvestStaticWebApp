import ListIndustries from './components/ListIndustries';

const Settings = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="divider"></div>
      <div className="flex flex-col gap-5">
        <ListIndustries />
      </div>
    </div>
  );
};

export default Settings;
