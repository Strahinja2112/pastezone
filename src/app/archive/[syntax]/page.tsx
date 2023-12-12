import React from "react";

type Props = {
	params: {
		syntax: string;
	};
};

export default function SyntaxPage({ params }: Props) {
	return <div>{params.syntax}</div>;
}
