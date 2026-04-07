import { put, list, del } from '@vercel/blob';

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  // Simple security check using environment variables
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.VITE_ADMIN_STORAGE_TOKEN || 'local-token';
  
  if (authHeader !== `Bearer ${expectedToken}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Handle Upload
  if (request.method === 'POST') {
    if (action === 'upload') {
      try {
        const form = await request.formData();
        const file = form.get('file') as File;
        
        // Use the title/details as part of the filename or metadata
        // Since we are not using KV, we'll store basic info in the filename prefix
        const detailsStr = form.get('details') as string;
        const details = JSON.parse(detailsStr || '{}');
        
        if (!file) {
          return new Response('No file provided', { status: 400 });
        }

        // We use a prefix to help filter these specific portfolio assets later
        const filename = `portfolio/${Date.now()}-${file.name}`;

        // Upload to Blob
        const blob = await put(filename, file, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });

        return new Response(JSON.stringify(blob), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  // Handle Listing
  if (request.method === 'GET') {
    if (action === 'list') {
      try {
        // List blobs with the portfolio/ prefix
        const { blobs } = await list({
          prefix: 'portfolio/',
          token: process.env.BLOB_READ_WRITE_TOKEN
        });
        
        // Vercel Blob list() doesn't return metadata in the list view currently
        // But for our "just for me" use case, we can return the blobs
        // and extract what we can from the pathname or just use the blobs themselves.
        return new Response(JSON.stringify(blobs), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error: any) {
         return new Response(JSON.stringify({ error: error.message }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }

  // Handle Deletion
  if (request.method === 'DELETE') {
    const url = searchParams.get('url');
    if (!url) return new Response('URL required', { status: 400 });
    
    try {
      await del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
      return new Response('Deleted', { status: 200 });
    } catch (error: any) {
      return new Response(error.message, { status: 500 });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}
