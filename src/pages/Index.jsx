import React, { useState } from "react";
import { Box, VStack, Heading, Input, Button, Textarea, Stack, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();

  const handleSendMessage = () => {
    if (!username.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Message cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newMessage = { username, content: message, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setMessage(""); // Clear message input after sending
  };

  return (
    <VStack spacing={4} align="stretch" m={8}>
      <Heading as="h1" size="xl" textAlign="center">
        Anonymous Chat App
      </Heading>

      <Box p={4} boxShadow="md" borderRadius="md">
        <Stack spacing={3}>
          <Input placeholder="Your username..." value={username} onChange={(e) => setUsername(e.target.value)} />
          <Textarea placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button rightIcon={<FaPaperPlane />} colorScheme="teal" variant="solid" onClick={handleSendMessage}>
            Send Message
          </Button>
        </Stack>
      </Box>

      <Box p={4} boxShadow="md" borderRadius="md" bg="gray.100" overflowY="auto" maxHeight="400px">
        {messages.map((msg, index) => (
          <Box key={index} bg="white" p={3} my={2} borderRadius="md" boxShadow="base">
            <Text fontWeight="bold">{msg.username}</Text>
            <Text fontSize="sm" color="gray.600">
              {msg.timestamp.toLocaleTimeString()}
            </Text>
            <Text mt={2}>{msg.content}</Text>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default Index;
