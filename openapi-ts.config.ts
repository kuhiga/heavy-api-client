import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  client: "@hey-api/client-fetch",
  input: "https://api.hevyapp.com/docs.json",
  output: "src/client",
});
