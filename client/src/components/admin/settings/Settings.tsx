import Register from "./Register";

const Settings = () => {
	return (
		<div className="w-full flex flex-col gap-5">
			<div className="flex flex-col gap-5 w-full md:w-72">
				<div className="form-control">
					<label className="label cursor-pointer">
						<span className="label-text">Notifications</span>
						<input type="checkbox" className="toggle" defaultChecked />
					</label>
				</div>
				<div className="form-control">
					<label className="label cursor-pointer">
						<span className="label-text">Show Details</span>
						<input type="checkbox" className="toggle" defaultChecked />
					</label>
				</div>
			</div>
			<div className="divider"></div>
			<div className="flex flex-col gap-5">
				<span className="text-xl">Create new user</span>
				<Register />
			</div>
		</div>
	);
};

export default Settings;
