export class Quote {
    public quoteId: number;
    public content: string;
    public author: string;

    constructor(
        quoteId: number,
        content: string,
        author: string
      ) {
        this.quoteId = quoteId;
        this.content = content;
        this.author = author;
      }
}
