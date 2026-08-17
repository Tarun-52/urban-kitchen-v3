import { NextResponse } from 'next/server'
import FormDataNode from 'form-data'

export const runtime = 'nodejs'

export async function POST(request: Request): Promise<Response> {
  try {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kixnmz25'

    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
      'urban_kitchen_preset'

    const reqFormData = await request.formData()
    const file = reqFormData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        {
          status: false,
          message: 'No file',
        },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const form = new FormDataNode()

    form.append('file', buffer, {
      filename: file.name || 'image.png',
      contentType: file.type || 'image/png',
    })

    form.append('upload_preset', uploadPreset)
    form.append('folder', 'products')

    return new Promise<Response>((resolve) => {
      form.submit(
        {
          protocol: 'https:',
          hostname: 'api.cloudinary.com',
          path: `/v1_1/${cloudName}/image/upload`,
        },
        (err, res) => {
          if (err) {
            resolve(
              NextResponse.json(
                {
                  status: false,
                  message: err.message,
                },
                { status: 500 }
              )
            )
            return
          }

          let data = ''

          res.on('data', (chunk: Buffer | string) => {
            data += chunk.toString()
          })

          res.on('end', () => {
            if (
              res.statusCode &&
              res.statusCode >= 200 &&
              res.statusCode < 300
            ) {
              try {
                const parsed = JSON.parse(data)

                resolve(
                  NextResponse.json({
                    status: true,
                    message: 'Uploaded successfully',
                    data: {
                      url: parsed.secure_url,
                      name: file.name,
                    },
                  })
                )
              } catch {
                resolve(
                  NextResponse.json(
                    {
                      status: false,
                      message: 'Parse error',
                    },
                    { status: 500 }
                  )
                )
              }
            } else {
              resolve(
                NextResponse.json(
                  {
                    status: false,
                    message:
                      'Cloudinary ' +
                      res.statusCode +
                      ': ' +
                      data.substring(0, 300),
                  },
                  { status: 500 }
                )
              )
            }
          })

          res.on('error', (error) => {
            resolve(
              NextResponse.json(
                {
                  status: false,
                  message: error.message,
                },
                { status: 500 }
              )
            )
          })
        }
      )
    })
  } catch (error) {
    const msg =
      error instanceof Error ? error.message : String(error)

    return NextResponse.json(
      {
        status: false,
        message: msg,
      },
      { status: 500 }
    )
  }
}