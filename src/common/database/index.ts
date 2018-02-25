import sql from 'sql.js';
import { createConnection } from 'typeorm';
import { getRootFolder, touchFile } from '../utils';
import User from './entities/User';

export async function initializeDatabase() {
  try {
    const dbPath = getRootFolder('database.db');
    // Check Database existence
    const db = new sql.Database();
    const defaultDbContent = db.export();
    const buffer = new Buffer(defaultDbContent);

    await touchFile(dbPath, buffer);
    await createConnection({
      type: 'sqljs',
      entities: [User],
      synchronize: true,
      logging: false,
      autoSave: true,
      location: dbPath,
    })
      .then(async (connection) => {
        // here you can start to work with your entities
        const user = new User();
        user.name = 'User 1';
        await user.save();
        console.log('Database created');
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.error('An error has occured in init', error);
  }
}
