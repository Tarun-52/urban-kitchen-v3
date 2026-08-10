import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'products'

    if (!file) {
      return NextResponse.json({ status: false, message: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const ext = path.extname(file.name) || '.png'
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-')
    const uniqueName = `${Date.now()}-${safeName}`
    const filePath = path.join(uploadDir, uniqueName)

    await writeFile(filePath, buffer)

    const url = `/${folder}/${uniqueName}`

    return NextResponse.json({
      status: true,
      message: 'Uploaded successfully',
      data: { url, name: file.name },
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ status: false, message: error.message || 'Upload failed' }, { status: 500 })
  }
}