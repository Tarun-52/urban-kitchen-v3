import { db } from '../src/lib/db'
import { verifyPassword } from '../src/lib/auth'

async function main() {
  try {
    const email = 'admin@urbankitchens.com'
    const password = 'admin123'
    const user = await db.user.findUnique({ where: { email } })
    console.log('Found user:', !!user)
    if (!user) return
    try {
      const ok = await verifyPassword(password, user.password)
      console.log('Password match:', ok)
    } catch (e) {
      console.error('Password verify error:', e)
    }
  } catch (e) {
    console.error('Auth check error:', e)
  } finally {
    await db.$disconnect()
  }
}

main()
