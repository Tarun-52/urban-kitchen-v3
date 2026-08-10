import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ status: false, message: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'uploads', 'products')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')
    const uniqueName = Date.now() + '-' + safeName
    const filePath = path.join(uploadDir, uniqueName)

    await writeFile(filePath, buffer)

    const url = '/api/files/products/' + uniqueName

    return NextResponse.json({
      status: true,
      message: 'Uploaded successfully',
      data: { url: url, name: file.name },
    })
  } catch (error) {
    let message = 'Upload failed'
    if (error instanceof Error) {
      message = error.message
    }
    return NextResponse.json({ status: false, message: message }, { status: 500 })
  }
}