export class HevyAPIError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body: string,
    public url: string
  ) {
    super(`${status} ${statusText}: ${body} (${url})`);
    this.name = "HevyAPIError";
  }
}
