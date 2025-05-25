import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const defaultQueryFn = async ({ queryKey }) => {
  const endpoint = queryKey[0];
  const res = await fetch(endpoint);
  const data = await res.json();
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 15, 
       queryFn: defaultQueryFn,
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
