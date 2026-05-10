import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db';
import Arena from '../models/Arena';

const BLOB_BASE = 'https://nbalivescore.blob.core.windows.net/arenas';

const arenaPhotos: Record<string, string> = {
  'TD Garden': `${BLOB_BASE}/bos.jpg`,
  'Barclays Center': `${BLOB_BASE}/bkn.jpg`,
  'Madison Square Garden': `${BLOB_BASE}/nyk.jpg`,
  'Wells Fargo Center': `${BLOB_BASE}/phi.jpg`,
  'Scotiabank Arena': `${BLOB_BASE}/tor.jpg`,
  'United Center': `${BLOB_BASE}/chi.jpg`,
  'Rocket Mortgage FieldHouse': `${BLOB_BASE}/cle.png`,
  'Little Caesars Arena': `${BLOB_BASE}/det.jpg`,
  'Gainbridge Fieldhouse': `${BLOB_BASE}/ind.jpg`,
  'Fiserv Forum': `${BLOB_BASE}/mil.jpg`,
  'State Farm Arena': `${BLOB_BASE}/atl.jpg`,
  'Spectrum Center': `${BLOB_BASE}/cha.jpg`,
  'Kaseya Center': `${BLOB_BASE}/mia.jpg`,
  'Amway Center': `${BLOB_BASE}/orl.jpg`,
  'Capital One Arena': `${BLOB_BASE}/was.jpg`,
  'Ball Arena': `${BLOB_BASE}/den.jpg`,
  'Target Center': `${BLOB_BASE}/min.jpg`,
  'Paycom Center': `${BLOB_BASE}/okc.jpg`,
  'Moda Center': `${BLOB_BASE}/por.jpg`,
  'Delta Center': `${BLOB_BASE}/uta.jpg`,
  'Chase Center': `${BLOB_BASE}/gsw.jpg`,
  'Crypto.com Arena': `${BLOB_BASE}/lal.jpg`,
  'Intuit Dome': `${BLOB_BASE}/lac.jpg`,
  'Footprint Center': `${BLOB_BASE}/phx.jpg`,
  'Golden 1 Center': `${BLOB_BASE}/sac.jpg`,
  'Frost Bank Center': `${BLOB_BASE}/sas.jpg`,
  'Toyota Center': `${BLOB_BASE}/hou.jpg`,
  'American Airlines Center': `${BLOB_BASE}/dal.jpg`,
  'FedExForum': `${BLOB_BASE}/mem.jpg`,
  'Smoothie King Center': `${BLOB_BASE}/nop.jpg`,
};

const seedArenaPhotos = async () => {
  await connectDB();

  for (const [name, photoUrl] of Object.entries(arenaPhotos)) {
    const result = await Arena.updateOne({ name }, { $set: { photoUrl } });
    if (result.matchedCount === 0) {
      console.log(`⚠️  Not found: ${name}`);
    } else {
      console.log(`✅ Updated: ${name}`);
    }
  }

  console.log('Done!');
  process.exit(0);
};

seedArenaPhotos();