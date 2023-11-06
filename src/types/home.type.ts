export type AllComplaints = {
  feedback: {
    is_upvote: boolean;
    is_downvote: boolean;
  };
  complaint: {
    _id: string;
    title: string;
    description: string;
    status: "pending" | "in progress" | "resolved";
    totalUpvotes: number;
    totalDownvotes: number;
    createdAt: string;
    urlComplaint: string | null;
  };
  username: string;
  urlUser: string;
};

export type ViralComplaints = {
  virals: {
    _id: string;
    title: string;
    totalUpvotes: number;
  }[];
};
