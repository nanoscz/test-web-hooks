import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private githubService: GithubService,
    private discordService: DiscordService
  ) { }

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("x-github-event") ?? "Unknown";
    // const signature = req.header("x-hub-signature-256") ?? "Unknown";
    const payload = req.body;

    const action: { [key: string]: Function } = {
      "star": this.githubService.onStar,
      "issues": this.githubService.onIssue
    }

    const message = action[githubEvent](payload);
    this.discordService.notify(message)
      .then(() => res.status(202).send("Accepted"))
      .catch(() => res.status(500).send("Internal Error"))
  }
}