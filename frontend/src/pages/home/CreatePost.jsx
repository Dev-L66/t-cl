import { CiImageOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import SmileyPicker from "./SmileyPicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { API } from "../../utils/index.js";

const CreatePost = () => {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const imageRef = useRef(null);
  const textAreaRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const [maxChars] = useState(280);



  const queryClient = useQueryClient();
  const {data:authUser} = useQuery({queryKey:["authUser"], queryFn:["authUser"]});
 
  const {mutate:createPost, isPending:isPosting, isError, error} = useMutation({
    mutationFn: async ({text, img})=>{
      try{
       const res = await fetch(`${API}/api/posts/create`,{
        method: "POST",
        credentials: "include",
        headers:{
         "Content-Type" : "application/json"
        },
        body: JSON.stringify({text, img})
       });
       const data = await res.json();
       if (!res.ok)  throw new Error (data.error || "Something went wrong.");
       return data;
      }catch(error){
        console.error(error);
        throw new Error(error);
      }
    },
     onSuccess: (newPost) => {
      setText("");
      setImage("");
      toast.success("Post created succesfully!");
      queryClient.setQueryData(["posts"], (oldData) => [{...newPost, user: authUser, profileImg: authUser?.profileImg},...oldData]);
    
    },
  })
  useEffect(()=>{
   setCharCount(text.length);
  },[text])

  useEffect(()=>{
  textAreaRef.current.style.height = "auto";
  textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  },[text])

  const handleTextChange = (e)=>{
    const inputText = e.target.value;
    if(inputText.length <= maxChars){
      setText(inputText);
    }

  }

  
  const handlePicker = (e) => {
    e.preventDefault();
    setPicker(!picker);
  };

  const handleEmojiSelect = (emoji) => {
    if (text.length + emoji.length <= maxChars) {
    setText((prev) => prev + emoji);
  }
    setPicker(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    createPost({text, img: image});
  }
  
  return (
    <div className="p-8 border-b border-primary">
      <div className="flex justify-center p-4 gap-3">
        <div className="flex-shrink-0">
          <img
            src={authUser?.profileImg || "/avatar-placeholder.png"}
            loading="lazy"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={handleTextChange}
            placeholder="What is happening?!"
            rows="1"
            className="text-lg border-t text-secondary border-none textarea resize-none w-full focus:outline-none"
          ></textarea>
          <div className="relative">
            {image && (
              <>
                <p>
                  <IoCloseCircleOutline
                    onClick={() => {
                      setImage(null);
                      imageRef.current.value = null;
                    }}
                  />
                </p>
                <div className="flex justify-center items-center">
                  <img
                    src={image}
                    className="object-contain"
                    alt="previewImage"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                    loading="lazy"
                  />
                </div>
              </>
            )}
          </div>
          <div className="border-primary flex justify-between pt-2 border-t ">
            <div className="flex gap-3 text-2xl font-bold text-primary">
              <CiImageOn onClick={() => imageRef.current.click()} />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
                ref={imageRef}
              />
              <MdOutlineEmojiEmotions onClick={handlePicker} />

              <div className="absolute bottom-15"> 
                {picker && (
                <SmileyPicker onEmojiSelect={handleEmojiSelect} />
                )}
              </div>
            </div>
            <div className="text-secondary flex justify-end w-100 p-2">
              <span>{charCount}/{maxChars}</span>
            </div>
            
           <button
  type="submit"
  disabled={picker || charCount > maxChars || (charCount === 0 && !image) || isPosting}
  className="disabled:opacity-25 bg-primary text-secondary text-xs font-bold px-4 py-2 rounded-full"
>
  {isPosting ? "Posting..." : "Post"}
</button>

          </div>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
