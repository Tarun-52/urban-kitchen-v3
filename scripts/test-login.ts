async function main() {
  try {
    const res = await fetch('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@urbankitchens.com', password: 'admin123' }),
    })
    const data = await res.json()
    console.log('Status:', res.status)
    console.log('Body:', data)
  } catch (e) {
    console.error('Request error:', e)
    process.exitCode = 1
  }
}

main()
