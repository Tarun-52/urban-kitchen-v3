import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Use env vars if available, otherwise use hardcoded values
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'kixnmz25'
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'urban_kitchen_preset'

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

    if (!res.ok) {
      return NextResponse.json(
        { status: false, message: 'Upload failed: ' + resText.substring(0, 200) },
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
    return NextResponse.json({ status: false, message: msg }, { status: 500 })
  }
}