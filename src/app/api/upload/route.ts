import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    if (!cloudName || !uploadPreset) {
      console.error('Missing env vars:', { cloudName: !!cloudName, uploadPreset: !!uploadPreset })
      return NextResponse.json(
        { status: false, message: 'Cloudinary not configured. Check .env file.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ status: false, message: 'No file provided' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    let binary = ''
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i])
    }
    const base64 = btoa(binary)
    const dataUri = 'data:' + (file.type || 'image/png') + ';base64,' + base64

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload',
      {
        method: 'POST',
        body: JSON.stringify({
          file: dataUri,
          upload_preset: uploadPreset,
          folder: 'products',
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    )

    const resText = await res.text()
    console.log('Cloudinary response status:', res.status)
    console.log('Cloudinary response body:', resText.substring(0, 500))

    if (!res.ok) {
      return NextResponse.json(
        { status: false, message: 'Cloudinary error: ' + resText.substring(0, 200) },
        { status: 500 }
      )
    }

    const data = JSON.parse(resText)

    return NextResponse.json({
      status: true,
      message: 'Uploaded successfully',
      data: { url: data.secure_url, name: file.name },
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Upload error:', msg)
    return NextResponse.json({ status: false, message: msg }, { status: 500 })
  }
}