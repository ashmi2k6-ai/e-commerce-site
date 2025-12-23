import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaRegPaperPlane } from 'react-icons/fa';

const FloatingBtn = styled(motion.button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--pastel-blue);
  color: white;
  border: none;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  font-size: 1.5rem;
`;

const ChatWindow = styled(motion.div)`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 4px solid var(--pastel-pink);
`;

const ChatHeader = styled.div`
  background: var(--pastel-pink);
  padding: 1rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 { margin: 0; font-size: 1.1rem; }
`;

const MessageList = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff9f9;
`;

const Message = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 15px;
  max-width: 80%;
  font-size: 0.9rem;
  line-height: 1.4;
  ${props => props.isBot ? `
    background: #f0f0f0;
    align-self: flex-start;
  ` : `
    background: var(--pastel-blue);
    color: white;
    align-self: flex-end;
  `}
`;

const ChatInputArea = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  outline: none;
  &:focus { border-color: var(--pastel-blue); }
`;

const SendBtn = styled.button`
  background: var(--pastel-blue);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! How can I help you today? I can assist with orders, payments, and product details. ✨", isBot: true }
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { text: input, isBot: false }]);
        setInput("");

        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thank you for your inquiry about " + input + ". I'm looking into that for you! One moment...",
                isBot: true
            }]);
        }, 1000);
    };

    return (
        <>
            <FloatingBtn
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes /> : <FaComments />}
            </FloatingBtn>

            <AnimatePresence>
                {isOpen && (
                    <ChatWindow
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    >
                        <ChatHeader>
                            <h3>Pastel Support AI</h3>
                            <FaTimes style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                        </ChatHeader>
                        <MessageList>
                            {messages.map((m, i) => (
                                <Message key={i} isBot={m.isBot}>{m.text}</Message>
                            ))}
                        </MessageList>
                        <ChatInputArea>
                            <Input
                                placeholder="Type your doubt..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <SendBtn onClick={handleSend}><FaRegPaperPlane /></SendBtn>
                        </ChatInputArea>
                    </ChatWindow>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
