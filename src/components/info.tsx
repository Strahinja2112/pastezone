import { InfoIcon } from "lucide-react";
import React, { PropsWithChildren } from "react";

export default function Info({ children }: PropsWithChildren) {
	return (
		<div className="w-full border rounded-sm flex items-center justify-start p-2 text-sm gap-2 bg-bg font-extralight">
			<div className="w-[35px]">
				<InfoIcon className="w-8 h-8 text-muted-foreground" />
			</div>
			{children}
		</div>
	);
}
