import { articleSchema } from "@/app/domain/Article";
import generateOpenApiSpec from "@omer-x/next-openapi-json-generator";

export const dynamic = 'force-static';

export const GET = async () => {
  const spec = await generateOpenApiSpec({
    articleSchema
  }, {
    info: {
      title: "Next.js API Docs with next-openapi-route-handler",
      version: "1.0.0",
    },
  });

  return Response.json(spec);
}