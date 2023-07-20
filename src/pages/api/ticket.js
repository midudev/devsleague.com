import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { r2 } from '@/lib/s3'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
  },
}

export default async function handler(req, res) {
  // read cookie with unique identifier
  const id = req.cookies['_az']

  console.log(req.method)
  if (req.method === 'POST') {
    // const signedUrl = await getSignedUrl(
    //   r2,
    //   new PutObjectCommand({
    //     Bucket: process.env.R2_BUCKET_NAME,
    //     Key: `${id}.pdf`,
    //   }),
    //   { expiresIn: 60 }
    // )

    // use formidable to read file from request
    console.log('parsing form')
    const form = formidable({ multiples: true })

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(err)
        throw err
      }

      console.log(fields, files)
      console.log('parsed')

      return res.status(200).json({ fields, files })
    })

    // const command = new PutObjectCommand({
    //   Bucket: process.env.R2_BUCKET_NAME,
    //   Key: `ticket-${id}.png`,
    //   Body: buffer,
    //   ContentType: 'image/png',
    // })

    // await r2.send(command)

    // const uploadedImageUrl = `${process.env.R2_URL}/${key}`

    // return res.status(200).json({ url: uploadedImageUrl })
  }
}
