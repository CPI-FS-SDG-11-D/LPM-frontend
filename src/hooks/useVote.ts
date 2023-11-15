import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SERVER_URL } from "../configs/url";

export default function useVote(postId: string, cookies: { token?: unknown }) {
  const queryClient = useQueryClient();

  const upVote = useMutation({
    mutationFn: async () => {
      const res = await axios.put(`${SERVER_URL}/api/upvote/${postId}`, null, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      return res.status;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["infiniteComplaints"]);
      queryClient.invalidateQueries(["search"]);
    },
  });

  const downVote = useMutation({
    mutationFn: async () => {
      const res = await axios.put(
        `${SERVER_URL}/api/downvote/${postId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
      return res.status;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["infiniteComplaints"]);
      queryClient.invalidateQueries(["search"]);
    },
  });
  return [upVote, downVote];
}
