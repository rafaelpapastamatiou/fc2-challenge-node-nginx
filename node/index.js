const express = require('express')

const app = express()

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

const mysql = require('mysql2/promise')

app.get('/health', (_, res) => {
  return res.send('Ok')
})

app.get('/', async (_, res) => {
  const connection = await mysql.createConnection(config)

  const sql = `INSERT INTO people(name) values('John Doe')`;
  await connection.query(sql)

  const listPeopleSql = 'SELECT * FROM people'

  const [people] = await connection.query(listPeopleSql)

  await connection.end()

  console.log(people)

  return res.send(`
    <h1>Full Cycle Rocks!</h1>

    <ul>
      ${people.reduce((acc, next) =>
    `${acc}
          <li>${next.id} - ${next.name}</li>
        `
    ,
    ''
  )}
    </ul>
  `)
})

app.listen(3000, () => console.log('Server running on port 3000'))