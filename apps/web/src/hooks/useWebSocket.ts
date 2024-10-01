import useWebSocket from "react-use-websocket";

const url = "http://localhost:3001/";

interface WebSocketMessage {
  color: string;
  index: number;
}

export const useColorWebSocket = () => {
  const {lastJsonMessage, sendJsonMessage} = useWebSocket<WebSocketMessage>(url);

  return {lastJsonMessage, sendJsonMessage};
}