import { fileURLToPath } from 'url';
import path, { resolve } from 'path'
import { normalizePath } from 'vite'
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getPath = (...pathSegments: string[]) => {
  return normalizePath(resolve(__dirname, './../', ...pathSegments))
}
