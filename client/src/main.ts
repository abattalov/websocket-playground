import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>WebSocket Playground</h1>
  <p>Open DevTools to see connection events.</p>
  <input id="message" type="text" placeholder="Enter a message" />
  <button id="send">Send</button>
  <ul id="messages"></ul>
`;

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = function connected(){
  console.log("Connected to WebSocket server");
}

ws.onmessage = function message(event){
  const messages = document.querySelector<HTMLUListElement>('#messages')!;

  const item = document.createElement("li");
  item.textContent = event.data;

  messages.appendChild(item);
}

ws.onclose = function disconnected(event) {
  console.log("Disconnected from WebSocket server");

  console.log("Disconnected", {
    code: event.code,
    reason: event.reason,
    wasClean: event.wasClean
  })
}

const messageInput = document.querySelector<HTMLInputElement>('#message')!;
const sendButton = document.querySelector<HTMLButtonElement>('#send')!;

sendButton.addEventListener("click", function sendMessage(){
  if (ws.readyState !== WebSocket.OPEN){
    console.log("WebSocket is not connected");
    return;
  }

  ws.send(JSON.stringify({
    type: "chat",
    text: messageInput.value
  }))
})