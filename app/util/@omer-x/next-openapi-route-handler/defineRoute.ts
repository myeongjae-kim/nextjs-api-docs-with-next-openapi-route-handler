import globalErrorHandler from "../../globalErrorHandler";
import { returnDefineRoute } from "./returnDefineRoute";

export const defineRoute = returnDefineRoute({ actionMiddleware: globalErrorHandler });