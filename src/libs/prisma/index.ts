const user = {
  profile: {
    select: { uid: true, twitter: true, zenn: true, qiita: true, link: true, avatar: true },
  },
};

const post = { topics: true };

export const prismaIncludeQuery = { user, post };
