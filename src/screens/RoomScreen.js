import React, {useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export default function RoomScreen() {
  const [messages, setMessages] = useState([
    /**
     * Mock mesasge data
     *
     */
    {
      _id: 0,
      text: 'New room created',
      createdAt: new Date().getTime(),
      system: true,
    },
    {
      _id: 1,
      text: 'Hello',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
      },
    },
  ]);
  //helper method that sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{_id: 1}}
    />
  );
}
