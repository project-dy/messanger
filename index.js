const express = require('express');
const { StreamChat } = require('stream-chat');

const app = express();

// GetStream.io 앱 정보
const apiKey = 'YOUR_API_KEY';
const apiSecret = 'YOUR_API_SECRET';

// GetStream.io 클라이언트 인스턴스 생성
const client = new StreamChat(apiKey, apiSecret);

// 채널 엔드포인트
app.post('/channels', async (req, res) => {
  try {
    const { channelType, channelId } = req.body;
    
    // 채널 생성
    const channel = client.channel(channelType, channelId);
    
    // 채널 조회
    await channel.watch();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create channel.' });
  }
});

// 메시지 엔드포인트
app.post('/channels/:channelId/messages', async (req, res) => {
  try {
    const { channelId } = req.params;
    const { userId, text } = req.body;
    
    const channel = client.channel('messaging', channelId);
    
    // 메시지 생성
    const message = {
      text,
      user: { id: userId },
    };
    
    // 메시지 전송
    await channel.sendMessage(message);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
