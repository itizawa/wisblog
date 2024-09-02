import { PrismaClient as PrismaClientOrigin } from '@prisma/client';

export class PrismaClientSingleton {
  private static _instance: PrismaClientOrigin | undefined;

  private constructor() {}

  public static get instance(): PrismaClientOrigin {
    if (!PrismaClientSingleton._instance) {
      PrismaClientSingleton._instance = new PrismaClientOrigin();
    }

    return PrismaClientSingleton._instance;
  }
}

export const prismaClient = PrismaClientSingleton.instance;
