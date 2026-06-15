import { app } from './app'
import "dotenv/config"

const PORT = process.env.PORT ? Number(process.env.PORT) : 3333;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log('Servidor rodando em http://localhost:${PORT}')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()