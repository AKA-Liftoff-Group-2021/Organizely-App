export class Quote {
  public quoteId: number;
  public content: string;
  public author: string;
  public userId: string;

  constructor(
    quoteId: number,
    content: string,
    author: string,
    userId: string
  ) {
    this.quoteId = quoteId;
    this.content = content;
    this.author = author;
    this.userId = userId;
  }
}
