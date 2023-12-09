import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onSearch(): void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, onSearch, ...props }, ref) => {
		return (
			<div className="bg-main rounded-sm px-2 flex items-center justify-center">
				<input
					type={type}
					className={cn(
						"flex w-full bg-transparent rounded-sm p-2 pl-0 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				<Search className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-white transition-all" />
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
