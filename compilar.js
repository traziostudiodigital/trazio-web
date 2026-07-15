/**
 * compilar.js - Trazio Studio Multi-Template Compiler
 * Lee todas las plantillas `.template.html` en /plantillas/
 * y las compila a la raíz del proyecto sin librerías externas.
 */

const fs = require('fs');
const path = require('path');

const PLANTILLAS_DIR = path.join(__dirname, 'plantillas');
const ROOT_DIR = __dirname;

function readFileSyncSafe(filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
}

function replaceIncludes(html) {
    const includeRegex = /<!--\s*@@include\((componentes\/[^)]+)\)\s*-->/g;
    return html.replace(includeRegex, (match, relativePath) => {
        const componentPath = path.join(__dirname, relativePath);
        if (!fs.existsSync(componentPath)) {
            console.error(`❌ Componente no encontrado: ${componentPath}`);
            return match;
        }
        return readFileSyncSafe(componentPath);
    });
}

function compileAll() {
    if (!fs.existsSync(PLANTILLAS_DIR)) {
        console.error(`❌ El directorio de plantillas no existe: ${PLANTILLAS_DIR}`);
        process.exit(1);
    }

    const templateFiles = fs.readdirSync(PLANTILLAS_DIR).filter(file => file.endsWith('.template.html'));

    if (templateFiles.length === 0) {
        console.log('⚠️ No se encontraron archivos .template.html en plantillas/');
        return;
    }

    templateFiles.forEach(file => {
        const templatePath = path.join(PLANTILLAS_DIR, file);
        const outputFileName = file.replace('.template.html', '.html');
        const outputPath = path.join(ROOT_DIR, outputFileName);

        const templateContent = readFileSyncSafe(templatePath);
        const compiledContent = replaceIncludes(templateContent);

        fs.writeFileSync(outputPath, compiledContent, { encoding: 'utf8' });
        console.log(`✅ Compilado con éxito: ${file} ➔ ${outputFileName}`);
    });
}

if (require.main === module) {
    compileAll();
}