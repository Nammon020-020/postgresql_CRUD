const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "172.20.0.2",
    database: "CRUD",
    password: "password",
    port: 5432
})

let connectHandle = async ()=>{
  const client = await pool.connect();
  try {
    const queryResult = await client.query('SELECT * FROM users');
    console.log('Query results:', queryResult.rows);
  } catch (error) {
    console.error('Error executing query', error);
  } finally {
    client.release(); // Release the connection
  }
}
connectHandle()
module.exports = pool