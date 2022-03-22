// const Pool = require('pg').Pool
// import Pool from "pg".pool
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'labben',
  password: 'changeme',
  port: 5432,
})

export const getUsers = (request, response) => {
  pool.query('SELECT * FROM projekt ORDER BY id ASC', (error, results) => {
    if (error) {
      response.status(404)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM projekt WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(404)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const createUser = (request, response) => {
  const { projekt_namn, projekt_budget,projekt_ledare_id, projekt_kod } = request.body

  pool.query('INSERT INTO projekt (projekt_namn, projekt_budget,projekt_ledare_id, projekt_kod ) VALUES ($1, $2, $3, $4) RETURNING *', 
  [projekt_namn, projekt_budget,projekt_ledare_id, projekt_kod], (error, results) => {
    if (error) {
      response.status(404)
      throw error
      
    }
    response.status(201).json(results.rows[0]).send(`User added `)
  })
}

export const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { projekt_namn, projekt_budget,projekt_ledare_id, projekt_kod } = request.body

  pool.query(
    'UPDATE projekt SET projekt_namn = $1, projekt_budget = $2, projekt_ledare_id = $3, projekt_kod = $4 WHERE id = $5 RETURNING *',
    [projekt_namn, projekt_budget,projekt_ledare_id, projekt_kod, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    }
  )
}

export const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM projekt WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(404)
      throw error
    }
    response.status(204).send(`User deleted with ID: ${id}`)
  })
}

// module.exports = {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// }