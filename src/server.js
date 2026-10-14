import { connect } from './db.js';
import { createApp } from './app.js';

const port = process.env.PORT ?? 3000;

// Connect first, so we never accept requests we can't serve.
try {
  await connect();
} catch (err) {
  // Print one readable line instead of Mongoose's 300-line topology dump.
  console.error(`\n✖ Could not connect to MongoDB: ${err.message.split('.')[0]}.`);
  console.error('  Most common cause: your current IP is not in Atlas → Network Access.');
  process.exit(1);
}

const app = createApp();
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
