import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import ChatProvider from "./context/chatprovider";


const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatProvider><Homepage /></ChatProvider>,
    },
    {
      path: "/chats",
      element:<ChatProvider><Chatpage /></ChatProvider>,
    },
  ]);
  
  return (
    
      <div className="App">
        <RouterProvider router={router} />
      </div>
    
  );
};

export default App;
