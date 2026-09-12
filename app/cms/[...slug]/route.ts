import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const filename = slug.join('/');
  const filePath = path.join(process.cwd(), 'data', 'cms', filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('CMS chunk not found', { status: 404 });
  }

  const rangeParam = request.nextUrl.searchParams.get('range');
  const data = fs.readFileSync(filePath);

  let responseData = data;
  if (rangeParam && typeof rangeParam === 'string') {
    const ranges = rangeParam.split(',');
    const chunks: Buffer[] = [];
    for (const r of ranges) {
      const parts = r.trim().split('-');
      if (parts.length === 2) {
        const start = parseInt(parts[0], 10);
        const end = parseInt(parts[1], 10);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          chunks.push(data.subarray(start, end + 1));
        }
      }
    }
    if (chunks.length > 0) {
      responseData = Buffer.concat(chunks);
    }
  }

  return new NextResponse(responseData, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': responseData.length.toString(),
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
