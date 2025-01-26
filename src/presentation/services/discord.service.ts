interface Option {
  url: string
}

export class DiscordService {
  private discordWebhookUrl = ""
  constructor(private readonly option: Option) {
    this.discordWebhookUrl = option.url;
  }

  async notify(message: string): Promise<boolean> {
    const body = {
      content: message,
      // embeds: [
      //   {
      //     image: { url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTA3YmR6cmNxa25laTEyOHFtZWpycXFxc2FoMnpjNGxqa3pkZzFiaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d9RbxjZ8QXesiYoerE/giphy.gif" }
      //   }
      // ]
    }

    const res = await fetch(this.discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      return false;
    }

    return true

  }

}