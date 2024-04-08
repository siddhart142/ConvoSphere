import React, { useEffect } from 'react';
// import AppLayout from '../Components/layout/AppLayout';
import axios from 'axios';

const Chat = () => {
  const fetchData = async () => {

    try {
      const response = await axios.get("http://localhost:8000/api/v1/chats/chats");
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      chat
    </div>
  );
};
export default Chat;
