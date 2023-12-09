import React from "react";
import Image from "next/image";

type Props = {};

export default function Header({}: Props) {
	return (
		<div className="h-14 w-full p-1 max-w-[1340px] flex items-center justify-start">
			<div className="flex gap-3 items-center justify-center">
				<Image
					src="/logo-dark.png"
					alt=""
					width={150}
					height={150}
					className="h-10 w-10"
				/>
				<h1 className="text-xl leading-8 tracking-widest">PASTEZONE</h1>
			</div>
			<div className="flex gap-3 items-center justify-center"></div>
		</div>
	);
}
