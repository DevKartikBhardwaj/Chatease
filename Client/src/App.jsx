import React,{useEffect} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import ChatProvider from "./context/chatprovider";


const App = () => {


  const handleError = (error) => {
    console.error("Resource loading failed:", error);
  };
  
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://chatease-frontend-4ips.onrender.com/css/blockedPage.css';
    link.onload = () => console.log("Stylesheet loaded successfully");
    link.onerror = handleError;
    document.head.appendChild(link);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatProvider><Homepage /></ChatProvider>,
    },
    {
      path: "/chats",
      element:<ChatProvider> <Chatpage /></ChatProvider>,
    },
  ]);
  
  return (
    
      <div className="App">
        <RouterProvider router={router} />
      </div>
    
  );
};

export default App;
