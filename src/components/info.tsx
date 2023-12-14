import { cn } from "@/lib/utils";
import { InfoIcon, LucideIcon } from "lucide-react";
import React, { PropsWithChildren, ReactNode } from "react";

type Props = {
	className?: string;
	icon?: ReactNode;
};

export default function Info({
	children,
	className,
	icon,
}: PropsWithChildren<Props>) {
	return (
		<div
			className={cn(
				"w-full border rounded-sm flex items-center justify-start p-2 text-sm gap-2 bg-bg font-light",
				className
			)}
		>
			<div className="w-[35px]">
				{icon ? icon : <InfoIcon className="w-8 h-8 text-muted-foreground" />}
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
}
