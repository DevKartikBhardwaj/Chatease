import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import ChatProvider from "./context/chatprovider";


const App = () => {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/chats",
      element:<Chatpage />,
    },
  ]);
  
  return (
    
      <div className="App">
        <ChatProvider>
        <RouterProvider router={router} />
        </ChatProvider>
      </div>
    
  );
};

export default App;
