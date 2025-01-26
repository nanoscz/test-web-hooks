import { GithubIssuePayload } from "../interfaces/github-issue.interface"
import { GithubStarPayload } from "../interfaces/github-star.interface"

export class GithubService {
  
  onStar(payload: GithubStarPayload): string {
    let message = ""
    const { action, sender, starred_at, repository } = payload
    if (starred_at) {
      message = `User ${sender.login} ${action} start on ${repository.full_name}`
    }

    return message
  }

  onIssue(payload: GithubIssuePayload): string {
    const { action, issue } = payload
   
    const messageAction: { [key: string]: string } = {
      "opened": `an issue was opened with this title ${issue.title} by ${issue.user.login}`,
      "closed": `an issue was closed with this title ${issue.title} by ${issue.user.login}`,
      "reopened": `an issue was reopened with this title ${issue.title} by ${issue.user.login}`,
    }
    return messageAction[action] ?? "Something message"
  }
}