import {
  PutObjectCommand,
  S3Client,
} from "https://esm.sh/@aws-sdk/client-s3@3";
import { getSignedUrl } from "https://esm.sh/@aws-sdk/s3-request-presigner@3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { filename, contentType } = await req.json();
  const key = `${Date.now()}-${filename}`;

  const s3 = new S3Client({
    region: Deno.env.get("AWS_REGION") ?? "",
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID") ?? "",
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY") ?? "",
    },
  });

  const uploadUrl = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: Deno.env.get("S3_BUCKET") ?? "",
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 60 },
  );

  return new Response(JSON.stringify({ uploadUrl, key }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
