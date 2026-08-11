import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kixnmz25'
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'urban_kitchen_preset'

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ status: false, message: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Send as multipart form data directly (no base64)
    const cloudForm = new FormData()
    cloudForm.append('file', new Blob([buffer], { type: file.type || 'image/png' }), file.name || 'image.png')
    cloudForm.append('upload_preset', uploadPreset)
    cloudForm.append('folder', 'products')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload',
      {
        method: 'POST',
        body: cloudForm,
      }
    )

    const text = await res.text()

    if (!res.ok) {
      return NextResponse.json(
        { status: false, message: 'Cloudinary: ' + text.substring(0, 300) },
        { status: 500 }
      )
    }

    const data = JSON.parse(text)

    return NextResponse.json({
      status: true,
      message: 'Uploaded successfully',
      data: { url: data.secure_url, name: file.name },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ status: false, message: msg }, { status: 500 })
  }
}