import { RequestHandler } from "express";

export type WithError<T = {}> = T & { error: string };

export type ExpressHandler<ReqBody = any, ResBody = any, Params = any, Query = any> = RequestHandler<
  Params,
  Partial<WithError<ResBody>>,
  Partial<ReqBody>,
  Query
>;
