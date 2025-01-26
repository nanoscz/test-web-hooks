import "dotenv/config"
import { get } from "env-var"


export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DISCORD_WEBHOOK_URL: get("DISCORD_WEBHOOK_URL").required().asString(),
  GITHUB_WEBHOOK_SECRET: get("GITHUB_WEBHOOK_SECRET").required().asString(),
}