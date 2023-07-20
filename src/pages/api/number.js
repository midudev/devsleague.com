import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const number = await kv.get('number')
    return res.status(200).json({ number })
  }

  if (req.method === 'POST') {
    if (req.cookies['_az']) {
      const number = await kv.get('number')
      return res.status(200).json({ number })
    }

    const number = await kv.incr('number')

    res.setHeader('Set-Cookie', `_az=${crypto.randomUUID()}; Path=/; Secure; SameSite=Strict`)

    return res.status(200).json({ number })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
