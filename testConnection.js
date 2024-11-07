require('dotenv').config();  // .env 파일을 로드
const mongoose = require('mongoose');

// Mongoose 스키마 및 모델 설정
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// MongoDB 연결
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('MongoDB에 연결되었습니다.');

    // 테스트 데이터를 생성
    const testContact = new Contact({
      name: '테스트 사용자',
      email: 'test@example.com',
      phone: '010-1234-5678'
    });

    // 데이터베이스에 저장
    const savedContact = await testContact.save();
    console.log('데이터가 성공적으로 저장되었습니다:', savedContact);

    // 연결 종료
    mongoose.connection.close();
  } catch (error) {
    console.error('MongoDB 연결 또는 데이터 저장 오류:', error);
  }
};

dbConnect();
