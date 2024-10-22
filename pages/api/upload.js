// import multer from 'multer';
// import fs from 'fs';
// import csvParser from 'csv-parser';
// import prisma from '../../../lib/prisma';

// const upload = multer({ dest: './uploads/' });

// export const config = {
//   api: {
//     bodyParser: false
//   }
// };

// export default function handler(req, res) {
//   upload.single('file')(req, {}, async (err) => {
//     if (err) return res.status(400).json({ error: 'File upload failed' });

//     const contacts = [];

//     fs.createReadStream(req.file.path)
//       .pipe(csvParser())
//       .on('data', (row) => {
//         contacts.push(row);
//       })
//       .on('end', async () => {
//         try {
//           await prisma.contact.createMany({ data: contacts });
//           res.status(201).json({ message: 'Contacts imported successfully' });
//         } catch (error) {
//           res.status(400).json({ error: 'Data validation failed' });
//         }
//       });
//   });
// }
