import z from "zod";
import { ApiError } from "../domain/ApiError";
import { Action, ActionMiddleware } from "./@omer-x/next-openapi-route-handler/returnDefineRoute";

const globalErrorHandler = <T>(action: Action<T>): ReturnType<ActionMiddleware<T>> => {
  return async (source, request) => {
    try {
      return await action(source, request);
    } catch (e) {
      const defaultServerErrorStatus = 500;

      if (e instanceof z.ZodError) {
        return Response.json(new ApiError({
          status: defaultServerErrorStatus,
          error: "RESPONSE_VALIDATION_ERROR",
          code: "SERVER-001",
          message: e.issues?.[0]?.message,
        }), { status: defaultServerErrorStatus });
      }

      return Response.json(new ApiError({
        status: defaultServerErrorStatus,
        error: "INTERNAL_SERVER_ERROR",
        code: "SERVER-000",
        message: (e as Error).message,
      }), { status: defaultServerErrorStatus });
    }
  };
};

export default globalErrorHandler;