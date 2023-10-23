export type AllComplaints = {
  complaints: {
    _id: string;
    title: string;
    description: string;
    keterangan: string;
    username: string;
    totalUpvotes: number;
    downvotes: number;
    vote_flag: string;
    status: string;
  }[];
};

export type ViralComplaints = {
  virals: {
    _id: string;
    title: string;
    totalUpvotes: number;
  }[];
};
