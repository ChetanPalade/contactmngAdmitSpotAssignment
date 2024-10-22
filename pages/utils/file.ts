import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify';

export function parseContactsToCsv(contacts: any[]) {
    const records = contacts.map(contact => [
        contact.name, contact.email, contact.phone, contact.address, contact.timezone, contact.createdAt
    ]);
    let csv = '';

    stringify(records, { header: true, columns: ['Name', 'Email', 'Phone', 'Address', 'Timezone', 'Created At'] }, (err, output) => {
        csv = output;
    });

    return csv;
}
