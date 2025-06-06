import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../utils/index.js";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
     const {mutateAsync:updateProfile, isPending:isUpdatingProfile} = useMutation({
        mutationFn: async(formData)=>{
          try{
            const res = await fetch(`${API}/api/users/update`,{
              method:"POST",
              credentials:"include",
              headers:{
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok) throw new Error(data.error || "Something went wrong.");
            return data;
           
          }catch(error){
            console.error(error);
            throw new Error(error);
          }
        },
        onSuccess:()=>{
          toast.success("Profile updated successfully.");
         Promise.all([ 
          queryClient.invalidateQueries({queryKey:["authUser"]}),
           queryClient.invalidateQueries({queryKey:["getUserProfile"]})])
           
        },
        onError:(error)=>{
          toast.error(error.message);
        }
    
      })
      return {updateProfile, isUpdatingProfile};
}

export default useUpdateProfile