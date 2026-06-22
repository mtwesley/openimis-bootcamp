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

async function buildData() {
    console.log('Starting data build...');

    // 1. Read all data sources
    const [
        categoriesData,
        platformsData,
        resourcesData,
        pathsData,
    ] = await Promise.all([
        readCsv(CSV_FILES.categories),
        readCsv(CSV_FILES.platforms),
        readCsv(CSV_FILES.resources),
        readCsv(CSV_FILES.paths),
    ]);

    console.log('Successfully read all source files.');

    // 2. Process resources: generate IDs and clean up data
    const resources = resourcesData.map(r => ({
        id: generateResourceId(r),
        title: r.title,
        description: r.description || '',
        organization: r.organization || '',
        category: r.category ? r.category.split(',').map(c => c.trim()) : [],
        prerequisites: r.prerequisites ? r.prerequisites.split(',').map(p => p.trim()) : [],
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
                description: '',
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

    // 5. Cross-reference validation
    const validCategoryIds = new Set(categoriesData.map(c => c.category));

    // Check resource category references
    for (const r of resourcesData) {
        if (r.category) {
            for (const catId of r.category.split(',').map(c => c.trim())) {
                if (catId && !validCategoryIds.has(catId)) {
                    console.warn(`WARNING: Resource "${r.title}" references unknown category "${catId}"`);
                }
            }
        }
    }

    // Check path step category references
    for (const step of pathsData) {
        if (step.categories) {
            for (const catId of step.categories.split(',').map(c => c.trim())) {
                if (catId && !validCategoryIds.has(catId)) {
                    console.warn(`WARNING: Path "${step.path_title}" step "${step.step_title}" references unknown category "${catId}"`);
                }
            }
        }
    }

    // Check for categories with no resources
    for (const cat of categoriesData) {
        const hasResources = resources.some(r =>
            Array.isArray(r.category) ? r.category.includes(cat.category) : r.category === cat.category
        );
        if (!hasResources) {
            console.warn(`WARNING: Category "${cat.category_title}" (${cat.category}) has no resources`);
        }
    }

    // 6. Assemble the final JSON structure
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
