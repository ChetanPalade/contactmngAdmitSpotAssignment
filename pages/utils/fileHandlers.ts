import formidable from 'formidable';
import { parse } from 'papaparse';
import fs from 'fs';
import { NextApiRequest } from 'next/dist/shared/lib/utils';

export function handleFileUpload(req: NextApiRequest) {
    const form = formidable({ multiples: true });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            const contacts = parseFile(files.file[0].filepath);
            resolve(contacts);
        });
    });
}

function parseFile(filepath: string) {
    const content = fs.readFileSync(filepath, 'utf-8');
    return parse(content, { header: true }).data;
}

export function generateCSV(contacts: any[]) {
    const csv = contacts.map(contact => ({
        Name: contact.name,
        Email: contact.email,
        Phone: contact.phone,
        Address: contact.address,
        Timezone: contact.timezone,
        CreatedAt: contact.createdAt,
    }));

    const headers = Object.keys(csv[0]).join(',');
    const rows = csv.map(contact => Object.values(contact).join(',')).join('\n');
    return `${headers}\n${rows}`;
}
