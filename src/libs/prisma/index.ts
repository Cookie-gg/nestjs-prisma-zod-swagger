const user = { profile: { select: { uid: true, biography: true } } };

const post = { topics: true };

export const prismaIncludeQuery = { user, post };
