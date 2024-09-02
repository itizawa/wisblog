import { PrismaClient } from '@prisma/client';
import type { User } from '@repo/types';
import { type Request, type Response, Router } from 'express';

import passport from 'passport';

import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
const prismaClient = new PrismaClient();

const { FRONT_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;
if (!FRONT_URL || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error('Please set FRONT_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL');
}

const userRoutes = Router();

//セッションに保存
passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

//セッションから保存されたデータを呼び出し
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prismaClient.user.findUnique({ where: { id } });
    if (user == null) {
      throw new Error('user not found');
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    (_accessToken, _refreshToken, profile, done) => {
      if (profile) {
        return done(null, profile);
      }

      return done(null, false);
    },
  ),
);

userRoutes.use(passport.initialize());
userRoutes.use(passport.session());

userRoutes.get('/logout', (req: { logout: (callback: () => void) => void }, res) => {
  req.logout(() => {
    res.redirect(FRONT_URL);
  });
});

userRoutes.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

userRoutes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
  }),
  async (req, res, next) => {
    const requestUser = req.user as {
      emails: { value: string }[];
      displayName: string;
      photos: { value: string }[];
    };

    const emailValue = requestUser.emails[0]?.value;

    if (!emailValue) {
      return next(new Error('email not found'));
    }

    let user = await prismaClient.user.findFirst({
      where: {
        email: emailValue,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          email: emailValue,
          name: requestUser.displayName,
        },
      });
    }

    //成功したときの処理
    req.logIn(user, err => {
      if (err) {
        return next();
      }
      return res.redirect(FRONT_URL);
    });
  },
);

userRoutes.get('/me', (req: Request, res: Response) => {
  return res.status(200).json({ currentUser: req.user });
});

export { userRoutes };
