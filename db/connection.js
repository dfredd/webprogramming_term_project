import mongoose from "mongoose";

const connect = async () => {
    if (process.env.NODE_ENV !== 'production') {
        // mongoose.set('debug', true);
    }

    await mongoose.connect('mongodb://user_1:3O06NfRVjqrf9W@mongo.bluewarn.dev:27018/webprogramming', {
        dbName: 'webprogramming',
        useNewUrlParser: true,
        tls: true,
    }).then(() => {
        console.log("몽고디비 연결 성공");
    }).catch((err) => {
        console.error("몽고디비 연결 에러", err);
    });
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

export default connect;
