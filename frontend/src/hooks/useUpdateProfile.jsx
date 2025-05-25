
const useUpdateProfile = () => {
     const {mutate:updateProfile, isPending:isUpdatingProfile} = useMutation({
        mutationFn: async({coverImg, profileImg})=>{
          try{
            const res = await fetch(`/api/users/update`,{
              method:"POST",
              headers:{
                "Content-Type": "application/json",
              },
              body: JSON.stringify({coverImg, profileImg})
            });
            const data = await res.json();
            console.log(data)
            if(!res.ok) throw new Error(data.error || "Something went wrong.");
            return data;
           
          }catch(error){
            console.error(error);
            throw new Error(error);
          }
        },
        onSuccess:()=>{
          toast.sucess("Profile updated successfully.");
          promise.all([
            queryClient.invalidateQueries({queryKey:["authUser"]}),
            queryClient.invalidateQueries({queryKey:["userProfile"]}),
          ])
        },
        onError:(error)=>{
          toast.error(error.message);
        }
    
      })
      return {updateProfile, isUpdatingProfile};
}

export default useUpdateProfile