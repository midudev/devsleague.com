import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  // check if cookie is set to avoid abuse
  if (req.cookies['number'] !== '123') {
    return res.status(403).json({ error: 'Forbidden' })
  }
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
    req.cookies._az = '1'

    return res.status(200).json({ number })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
