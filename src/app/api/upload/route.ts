import { NextResponse } from 'next/server'
import https from 'https'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kixnmz25'
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'urban_kitchen_preset'

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ status: false, message: 'No file' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)
    const fileName = file.name || 'image.png'
    const mimeType = file.type || 'image/png'

    const boundary = '----CloudinaryBoundary' + Date.now()
    const endLine = '\r\n'

    const parts: Buffer[] = []

    // File part
    const fileHeader = '--' + boundary + endLine
      + 'Content-Disposition: form-data; name="file"; filename="' + fileName + '"' + endLine
      + 'Content-Type: ' + mimeType + endLine
      + endLine

    parts.push(Buffer.from(fileHeader))
    parts.push(fileBuffer)
    parts.push(Buffer.from(endLine))

    // Upload preset part
    const presetHeader = '--' + boundary + endLine
      + 'Content-Disposition: form-data; name="upload_preset"' + endLine
      + endLine
      + uploadPreset + endLine

    parts.push(Buffer.from(presetHeader))

    // Folder part
    const folderHeader = '--' + boundary + endLine
      + 'Content-Disposition: form-data; name="folder"' + endLine
      + endLine
      + 'products' + endLine

    parts.push(Buffer.from(folderHeader))

    // Closing boundary
    parts.push(Buffer.from('--' + boundary + '--' + endLine))

    const body = Buffer.concat(parts)

    const options = {
      hostname: 'api.cloudinary.com',
      path: '/v1_1/' + cloudName + '/image/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': body.length.toString(),
      },
    }

    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const parsed = JSON.parse(data)
              resolve(NextResponse.json({
                status: true,
                message: 'Uploaded successfully',
                data: { url: parsed.secure_url, name: fileName },
              }))
            } catch {
              resolve(NextResponse.json({ status: false, message: 'Parse error' }, { status: 500 }))
            }
          } else {
            resolve(NextResponse.json({
              status: false,
              message: 'Cloudinary ' + res.statusCode + ': ' + data.substring(0, 300),
            }, { status: 500 }))
          }
        })
      })

      req.on('error', (err) => {
        resolve(NextResponse.json({ status: false, message: err.message }, { status: 500 }))
      })

      req.write(body)
      req.end()
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ status: false, message: msg }, { status: 500 })
  }
}