import { MdFileUpload, MdHistory, MdSettings } from "react-icons/md";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation = ({ activeTab, setActiveTab }: TabNavigationProps) => {
  return (
    <div role="tablist" className="tabs tabs-lifted w-full flex">
      <button role="tab" className={`tab gap-2 ${activeTab === "data" ? "tab-active" : ""}`} onClick={() => setActiveTab("data")}>
        <MdFileUpload />
        Upload
      </button>
      <button role="tab" className={`tab gap-2 ${activeTab === "history" ? "tab-active" : ""}`} onClick={() => setActiveTab("history")}>
        <MdHistory />
        History
      </button>
      <button role="tab" className={`tab gap-2 ${activeTab === "settings" ? "tab-active" : ""}`} onClick={() => setActiveTab("settings")}>
        <MdSettings />
        Settings
      </button>
    </div>
  );
};

export default TabNavigation;
