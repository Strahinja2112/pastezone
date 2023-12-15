"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	onSearch?(): void;
	showSearch?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, onSearch, showSearch = false, ...props }, ref) => {
		return (
			<div
				className={cn(
					"bg-main border rounded-sm flex items-center justify-center",
					className,
					showSearch && "pr-2"
				)}
			>
				<input
					type={type}
					className={cn(
						"flex w-full bg-transparent rounded-sm p-2 py-1.5 pl-0 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				{showSearch ? (
					<Search
						className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-white transition-all"
						onClick={onSearch}
					/>
				) : null}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
