import { PrismaClient } from '@prisma/client';
import { type CreateBlogSchema, type User, createBlogSchema } from '@repo/types';
import { type Request, type Response, Router } from 'express';
import { loginRequired } from '~/middlewares/loginRequired';
import { validate } from '~/middlewares/validate';
import { CreateBlogUseCase } from '~/usecases/blog';

const blogRoutes = Router();

const createBlogUseCase = new CreateBlogUseCase(new PrismaClient());

blogRoutes.post(
  '/',
  loginRequired,
  validate(createBlogSchema.shape.options),
  async (req: Request<object, object, CreateBlogSchema['options']['body']>, res: Response) => {
    const user = req.user as User; // 型アサーションでuserが存在することを保証 TODO: アサーションを使わない方法を検討

    const response = await createBlogUseCase.execute({
      name: req.body.name,
      subDomain: req.body.subDomain,
      ownerId: user.id,
    });
    return res.status(200).json(response);
  },
);

export { blogRoutes };
