import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const useFollow = () => {
  const queryClient = useQueryClient();
  const { mutate:followUnfollow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong.");
        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Something went wrong.") ;
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {followUnfollow, isPending};
};
export default useFollow;
