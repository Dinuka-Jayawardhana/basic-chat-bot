import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '.env');

try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/key=([^&\s]+)/);

    if (!match) {
        console.error('Could not find API key in .env file');
        process.exit(1);
    }

    const apiKey = match[1];
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    console.log(`Fetching models...`);

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        console.error('Error fetching models:', data.error);
    } else {
        console.log('Available Models for generateContent:');
        if (data.models) {
            data.models.forEach(model => {
                if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${model.name}`);
                }
            });
        } else {
            console.log('No models found in response:', data);
        }
    }
} catch (error) {
    console.error('Error:', error.message);
}
