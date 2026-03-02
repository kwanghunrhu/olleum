import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import AdmZip from 'adm-zip';
import { INITIAL_PROJECTS, DEFAULT_THEME } from './src/constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Download Code Route
app.get('/download-code', (req, res) => {
  console.log('GET /download-code');
  const zip = new AdmZip();
  const ignore = ['node_modules', 'dist', '.git', 'database.sqlite', 'data.json'];
  
  const addFiles = (dir: string, zipPath: string) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (ignore.includes(file)) return;
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        addFiles(fullPath, path.join(zipPath, file));
      } else {
        zip.addLocalFile(fullPath, zipPath);
      }
    });
  };

  addFiles(__dirname, '');
  const buffer = zip.toBuffer();
  res.set('Content-Type', 'application/zip');
  res.set('Content-Disposition', 'attachment; filename=project.zip');
  res.send(buffer);
});

// Initialize Data File
if (!fs.existsSync(DATA_FILE)) {
  console.log('Initializing data.json with default values...');
  fs.writeFileSync(DATA_FILE, JSON.stringify({ 
    projects: INITIAL_PROJECTS, 
    theme: DEFAULT_THEME 
  }, null, 2));
}

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
const saveData = (data: any) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API Routes
app.get('/api/projects', (req, res) => {
  console.log('GET /api/projects');
  const data = getData();
  res.json(data.projects);
});

app.post('/api/projects', (req, res) => {
  console.log('POST /api/projects', req.body.title);
  const data = getData();
  data.projects.push(req.body);
  saveData(data);
  res.json({ success: true });
});

app.put('/api/projects/:id', (req, res) => {
  console.log('PUT /api/projects/', req.params.id);
  const data = getData();
  data.projects = data.projects.map((p: any) => p.id === req.params.id ? req.body : p);
  saveData(data);
  res.json({ success: true });
});

app.delete('/api/projects/:id', (req, res) => {
  console.log('DELETE /api/projects/', req.params.id);
  const data = getData();
  data.projects = data.projects.filter((p: any) => p.id !== req.params.id);
  saveData(data);
  res.json({ success: true });
});

app.get('/api/theme', (req, res) => {
  console.log('GET /api/theme');
  const data = getData();
  res.json(data.theme);
});

app.post('/api/theme', (req, res) => {
  console.log('POST /api/theme');
  const data = getData();
  data.theme = req.body;
  saveData(data);
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
