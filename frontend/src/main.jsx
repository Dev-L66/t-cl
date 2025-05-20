import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
       queryFn: async({queryKey})=>{
        try{
          const res = await fetch(queryKey[0]);
          const data = await res.json();
          if(!res.ok) throw new Error(data.message || "Something went wrong.");
          return data;
          
        }catch(error){
          console.error(error);
          throw error;
        }
      }
    }
  }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>  
  </StrictMode>,
)
