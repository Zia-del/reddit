export type PostResult = {
    id: number;              // assuming IDs are numeric (use `string` if not)
    title: string;
    body: string;
    views: number;           // assuming views are numbers
    tags: string[];          // array of strings
    reactions: {
      likes: number;
      dislikes: number;
    };
  };
  