import _defineRoute from "@omer-x/next-openapi-route-handler";
import globalErrorHandler from "../../globalErrorHandler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defineRoute = ((args: any) => {
  return _defineRoute({
    ...args,
    action: globalErrorHandler(args.action)
  })
}) as unknown as typeof _defineRoute;