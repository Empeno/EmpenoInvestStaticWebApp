import { useState } from "react";
import { MdFileUpload, MdHistory, MdSettings } from "react-icons/md";
import Data from "../components/admin/data/Data"; // Antag at disse komponenter er korrekte
import History from "../components/admin/history/History";
import Settings from "../components/admin/settings/Settings";

const Admin = () => {
	const [activeTab, setActiveTab] = useState("data"); // Standard til "data"

	return (
		<div className="w-full">
			{/* Fanenavigation */}
			<div role="tablist" className="tabs md:tabs-lg w-full md:w-96 text-[15px]">
				<button
					role="tab"
					className={`tab gap-2  ${activeTab === "data" ? "bg-neutral text-neutral-content rounded-lg shadow-md" : ""}`}
					onClick={() => setActiveTab("data")}
				>
					<MdFileUpload />
					Upload
				</button>
				<button
					role="tab"
					className={`tab gap-2  ${activeTab === "history" ? "bg-neutral text-neutral-content rounded-lg shadow-md" : ""}`}
					onClick={() => setActiveTab("history")}
				>
					<MdHistory />
					History
				</button>
				<button
					role="tab"
					className={`tab gap-2  ${activeTab === "settings" ? "bg-neutral text-neutral-content rounded-lg shadow-md" : ""}`}
					onClick={() => setActiveTab("settings")}
				>
					<MdSettings />
					Settings
				</button>
			</div>

			{/* Faneindhold */}
			<div className="mt-3 md:mt-5">
				{activeTab === "data" && (
					<div className="bg-base-100 rounded-lg shadow-md p-5 md:p-7">
						<Data />
					</div>
				)}
				{activeTab === "history" && (
					<div className="bg-base-100 rounded-lg shadow-md p-5 md:p-7">
						<History />
					</div>
				)}
				{activeTab === "settings" && (
					<div className="bg-base-100 rounded-lg shadow-md p-5 md:p-7">
						<Settings />
					</div>
				)}
			</div>
		</div>
	);
};

export default Admin;
