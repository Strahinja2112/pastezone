import { auth } from "@/auth";
import Info from "@/components/info";
import { db } from "@/db";
import { pastes } from "@/db/schema/pastes";
import { and, eq } from "drizzle-orm";
import Main from "./_components/main";
import { users } from "@/db/schema/users";
import { comments } from "@/db/schema/comments";
import CommentCard from "./_components/comment-card";

export default async function PasteIdPage({
	params,
}: {
	params: {
		pasteId: string;
	};
}) {
	const session = await auth();

	const [paste] = await db
		.select()
		.from(pastes)
		.where(eq(pastes.id, params.pasteId));

	if (!paste) {
		return (
			<div className="w-full h-full gap-5 flex flex-col items-stretch">
				<h1 className="border-b-2 pb-1 text-xl">Not Found(#404)</h1>
				<Info>
					<p>
						This page is no longer available. It has either expired, been
						removed by its creator, or removed by one of the Pastezone staff.
					</p>
				</Info>
			</div>
		);
	}

	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.id, paste.userId));

	const allComments = await db
		.select()
		.from(comments)
		.where(and(eq(comments.pasteId, paste.id), eq(comments.userId, user.id)));

	return (
		<Main paste={paste} user={user} session={session}>
			{allComments.length > 0 && (
				<div className="w-full border-b pb-4 gap-3 flex flex-col items-start justify-center">
					<h1 className="text-xl mb-1">Comments</h1>
					{allComments.map((comment) => (
						<CommentCard key={comment.id} comment={comment} />
					))}
				</div>
			)}
		</Main>
	);
}
