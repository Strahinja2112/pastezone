import React from "react";

type Props = {
	params: {
		userId: string;
	};
};

export default function UserIdPage({ params }: Props) {
	return <div>{params.userId}</div>;
}
