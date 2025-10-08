import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'data.json');
const LEARNING_MD_PATH = path.join(__dirname, '..', 'LEARNING.md');

const CSV_FILES = {
    categories: 'categories.csv',
    platforms: 'platforms.csv',
    resources: 'resources.csv',
    paths: 'paths.csv',
};

// Helper to read a CSV file and return its content as JSON
async function readCsv(filename) {
    const results = [];
    const filePath = path.join(DATA_DIR, filename);
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

// Generate a stable, unique ID for a resource
function generateResourceId(resource) {
    const hash = crypto.createHash('sha1');
    hash.update(resource.title + resource.url);
    return hash.digest('hex').substring(0, 8);
}

// Parse LEARNING.md to extract descriptions for paths
async function getPathDescriptions() {
    const descriptions = new Map();
    try {
        const content = await fsPromises.readFile(LEARNING_MD_PATH, 'utf-8');
        const pathRegex = /^###\s+(.+?)\s*\n\*\*Target\*\*:\s(.*?)$/gm;
        let match;
        while ((match = pathRegex.exec(content)) !== null) {
            const title = match[1];
            const description = match[2];
            const pathId = title.toLowerCase().replace(/ & /g, ' ').replace(/ /g, '_');
            descriptions.set(pathId, description);
        }
    } catch (error) {
        console.warn('Could not read LEARNING.md, descriptions will be empty.', error);
    }
    return descriptions;
}


async function buildData() {
    console.log('Starting data build...');

    // 1. Read all data sources
    const [
        categoriesData,
        platformsData,
        resourcesData,
        pathsData,
        pathDescriptions
    ] = await Promise.all([
        readCsv(CSV_FILES.categories),
        readCsv(CSV_FILES.platforms),
        readCsv(CSV_FILES.resources),
        readCsv(CSV_FILES.paths),
        getPathDescriptions(),
    ]);

    console.log('Successfully read all source files.');

    // 2. Process resources: generate IDs and clean up data
    const resources = resourcesData.map(r => ({
        id: generateResourceId(r),
        title: r.title,
        description: r.description || '',
        category: r.category ? r.category.split(',').map(c => c.trim()) : [],
        platform: r.platform,
        duration: parseInt(r.duration, 10) || 0,
        difficulty: parseInt(r.difficulty, 10) || 0,
        url: r.url,
        format: r.format
    }));

    // 3. Process paths and steps
    const pathsMap = new Map();
    for (const step of pathsData) {
        if (!pathsMap.has(step.path)) {
            pathsMap.set(step.path, {
                id: step.path,
                title: step.path_title,
                description: pathDescriptions.get(step.path) || '',
                totalDuration: 0,
                steps: []
            });
        }
        pathsMap.get(step.path).steps.push({
            rank: parseInt(step.rank, 10),
            title: step.step_title,
            categories: step.categories ? step.categories.split(',').map(c => c.trim()) : [],
        });
    }

    // 4. Pre-calculate total duration for each path
    for (const path of pathsMap.values()) {
        const resourceIdsInPath = new Set();
        path.steps.forEach(step => {
            step.categories.forEach(catId => {
                resources.forEach(res => {
                    if (Array.isArray(res.category) ? res.category.includes(catId) : res.category === catId) {
                        resourceIdsInPath.add(res.id);
                    }
                });
            });
        });

        let totalDuration = 0;
        resourceIdsInPath.forEach(resId => {
            const resource = resources.find(r => r.id === resId);
            if (resource) {
                totalDuration += resource.duration;
            }
        });
        path.totalDuration = totalDuration;
    }

    // 5. Assemble the final JSON structure
    const finalData = {
        platforms: platformsData.map(p => ({ id: p.platform, title: p.title })),
        categories: categoriesData.map(c => ({ id: c.category, title: c.category_title, group: c.group, group_title: c.group_title })),
        resources,
        paths: Array.from(pathsMap.values()),
    };

    // 6. Write the output file
    try {
        await fsPromises.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
        await fsPromises.writeFile(OUTPUT_PATH, JSON.stringify(finalData, null, 2));
        console.log(`Successfully wrote data.json to ${OUTPUT_PATH}`);
    } catch (error) {
        console.error('Error writing data.json:', error);
        process.exit(1);
    }
}

buildData();
