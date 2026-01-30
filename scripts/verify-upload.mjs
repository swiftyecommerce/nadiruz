import fs from 'fs';
import path from 'path';

async function testUpload() {
    // Create a dummy file
    const dummyPath = path.join(process.cwd(), 'test-image.txt');
    fs.writeFileSync(dummyPath, 'This is a test image content');

    const formData = new FormData();
    const blob = new Blob(['This is a test image content'], { type: 'text/plain' });
    formData.append('file', blob, 'test-image.txt');

    console.log('Uploading file...');
    const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
            'Cookie': 'session=' + (await getSessionToken()) // Helper to get token if needed, but the route checks session
        },
        body: formData
    });

    // To properly test this, we need a valid session. 
    // Since we fixed auth earlier, we can login first.
}

async function getSessionToken() {
    const loginRes = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@nadiruz.net', password: 'password123' })
    });
    const cookie = loginRes.headers.get('set-cookie');
    return cookie ? cookie.split(';')[0].split('=')[1] : '';
}

async function run() {
    try {
        const loginRes = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@nadiruz.net', password: 'password123' })
        });

        const cookie = loginRes.headers.get('set-cookie');
        if (!cookie) {
            console.error('Login failed');
            return;
        }

        console.log('Logged in, cookie:', cookie);

        const formData = new FormData();
        const blob = new Blob(['Mock image content'], { type: 'image/jpeg' });
        formData.append('file', blob, 'test.jpg');

        const uploadRes = await fetch('http://localhost:3000/api/upload', {
            method: 'POST',
            headers: {
                'Cookie': cookie
            },
            body: formData
        });

        console.log('Upload Status:', uploadRes.status);
        const data = await uploadRes.json();
        console.log('Upload Result:', data);

        if (uploadRes.ok && data.url) {
            console.log('✅ Upload Success');
        } else {
            console.error('❌ Upload Failed');
        }

    } catch (e) {
        console.error(e);
    }
}

run();
