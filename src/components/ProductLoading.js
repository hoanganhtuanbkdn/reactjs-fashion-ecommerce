import React, { memo } from 'react';

function ProductLoading() {
	return (
		<div className="grid w-full grid-cols-1 gap-5 md:grid-cols-4">
			<div>
				<div className="aspect-[305/430] w-full bg-[whitesmoke] "></div>
				<div className="pt-4">
					<div className="h-4 w-32 bg-[whitesmoke]" />
					<div className="h4 w-20 mt-3 bg-[whitesmoke]"></div>
				</div>
			</div>
			<div>
				<div className="aspect-[305/430] w-full bg-[whitesmoke] "></div>
				<div className="pt-4">
					<div className="h-4 w-32 bg-[whitesmoke]" />
					<div className="h4 w-20 mt-3 bg-[whitesmoke]"></div>
				</div>
			</div>
			<div>
				<div className="aspect-[305/430] w-full bg-[whitesmoke] "></div>
				<div className="pt-4">
					<div className="h-4 w-32 bg-[whitesmoke]" />
					<div className="h4 w-20 mt-3 bg-[whitesmoke]"></div>
				</div>
			</div>
			<div>
				<div className="aspect-[305/430] w-full bg-[whitesmoke] "></div>
				<div className="pt-4">
					<div className="h-4 w-32 bg-[whitesmoke]" />
					<div className="h4 w-20 mt-3 bg-[whitesmoke]"></div>
				</div>
			</div>
		</div>
	);
}

export default memo(ProductLoading);
