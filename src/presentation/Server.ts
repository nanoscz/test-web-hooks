import express, { Request, Response } from "express"
import { envs } from "../config/envs"
import { GithubController } from "./github/controller"
import { GithubService } from "./services/github.service"
import { DiscordService } from "./services/discord.service"

export class Server {
  static start() {
    const app = express()
    app.use(express.json())

    const githubService = new GithubService()
    const discordService = new DiscordService({ url: envs.DISCORD_WEBHOOK_URL });
    const githubController = new GithubController(githubService, discordService);

    app.post("/api/github", githubController.webhookHandler)
    app.use("*", (req: Request, res: Response) => {
      res.send("Welcome!")
    })

    app.listen(envs.PORT, () => {
      console.log(`App running on port ${envs.PORT}`)
    })
  }
}