"use client";
import React, { type MouseEvent } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ConfirmModalProps = {
	children: React.ReactNode;
	onConfirm: () => void;
};

export default function ConfirmModal({
	children,
	onConfirm,
}: ConfirmModalProps) {
	function handleConfirm(
		event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	): void {
		event.stopPropagation();
		onConfirm();
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
