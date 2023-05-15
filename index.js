const { StreamChat } = require('stream-chat');

// GetStream.io 앱 정보
const apiKey = '79kb57p64769';
const apiSecret = 'c66ympruf3mwefj2dw9p5pkbz2bn37r46x7mfyv43at9p98kzs3kq4s7jrap4da5';

// 클라이언트 인스턴스 생성
const client = new StreamChat(apiKey, apiSecret);

// 유저 토큰 생성
async function createUserToken(userId) {
  const token = client.createToken(userId);
  return token;
}

// 메시지 전송
async function sendMessage(channelId, userId, messageText) {
  const channel = client.channel('messaging', channelId);
  const userToken = await createUserToken(userId);
  
  await channel.watch();
  
  const message = {
    text: messageText,
    user: { id: userId },
  };

  await channel.sendMessage(message, { userToken });
}

// 메시지 수신
async function receiveMessage(channelId) {
  const channel = client.channel('messaging', channelId);
  const userToken = await createUserToken('USER_ID');
  
  await channel.watch();
  
  channel.on('message.new', event => {
    console.log('New message:', event.message.text);
  });
}

// 메시지 전송 예제
sendMessage('channelId', 'USER_ID', 'Hello, World!')
  .then(() => console.log('Message sent.'))
  .catch(error => console.error('Error:', error));

// 메시지 수신 예제
receiveMessage('channelId')
  .then(() => console.log('Receiving messages...'))
  .catch(error => console.error('Error:', error));
