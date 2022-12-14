import { getConnection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import createConnection from '../typeorm';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(`
  INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
  values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXY123')
  `);

  await connection.close();
}

create().then(() => console.log('Admin user successfully created.'));
