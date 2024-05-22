import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

const port = config.port;
const databaseUrl = config.database_url;

async function server(): Promise<void> {
  try {
    await mongoose.connect(databaseUrl as string);
    console.log('🌼 Database connected 🌼');

    app.listen(port, () => {
      console.log(`🚀🚀 Server is running on port ${port} 🚀🚀`);
    });
  } catch (error) {
    console.log('🔥 Faild to connect database 🔥');
    console.error('Server failed to start:', error);
    process.exit(1);
  }
}

// call the server function
server().catch(error => {
  console.error('Server failed to start:', error);
  process.exit(1);
});
