import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📋 Collections in database:');
    collections.forEach(collection => console.log(`- ${collection.name}`));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Check if your internet connection is working');
    console.log('2. Verify your MongoDB Atlas cluster is running');
    console.log('3. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('4. Double-check your MONGODB_URI in .env file');
  } finally {
    // Close the connection
    await mongoose.connection.close();
    process.exit(0);
  }
}

testConnection();
