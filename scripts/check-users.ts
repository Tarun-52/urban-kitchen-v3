import { db } from '../src/lib/db'

async function main() {
  try {
    const users = await db.user.findMany({ select: { id: true, name: true, email: true, status: true, password: true } })
    console.log('Users:', users)
  } catch (e) {
    console.error('Error querying users:', e)
    process.exitCode = 1
  } finally {
    await db.$disconnect()
  }
}

main()
