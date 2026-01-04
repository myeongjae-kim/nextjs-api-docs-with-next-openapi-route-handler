import { Article, articleSchema } from "@/app/domain/Article";
import defineRoute from "@omer-x/next-openapi-route-handler";
import z from "zod";

export const { GET } = defineRoute({
  operationId: "getArticleById",
  method: 'GET',
  summary: "Get article by id",
  description: "Get article by id",
  tags: ["Articles"],
  pathParams: z.object({
    id: z.number().describe("ID of the article"),
  }),
  action: async ({ pathParams }) => {
    const id = pathParams.id;
    return Response.json({
      id,
      title: `Article ${id}`,
      content: `Content of article ${id}`,
    } satisfies Article);
  },
  responses: {
    200: { description: "Article Fetched", content: articleSchema }
  },
  handleErrors: (errorType, issues) => {
    console.log(issues);
    switch (errorType) {
      case "PARSE_PATH_PARAMS":
        return Response.json({
          message: issues?.[0]?.message,
        }, { status: 404 });
      default:
        return new Response(null, { status: 500 });
    }
  }
});

export const PUT = () => {
  return new Response(null, { status: 200 });
}

export const DELETE = () => {
  return new Response(null, { status: 200 });
}