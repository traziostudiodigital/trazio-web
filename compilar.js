/**
 * compilar.js - Trazio Studio Build System (Tailwind v4)
 * 1. Compila plantillas HTML.
 * 2. Ejecuta Tailwind CLI v4 para generar output.css minificado.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PLANTILLAS_DIR = path.join(__dirname, 'plantillas');
const ROOT_DIR = __dirname;

function readFileSyncSafe(filePath) {
    try {
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    } catch (error) {
        console.error(`❌ ERROR: No se pudo leer el archivo: ${filePath}`);
        console.error(`   ${error.message}`);
        process.exit(1);
    }
}

// Función recursiva para soportar includes dentro de includes
function replaceIncludes(html) {
    const includeRegex = /<!--\s*@@include\((componentes\/[^)]+)\)\s*-->/g;
    let result = html;
    let match;
    
    while ((match = includeRegex.exec(result)) !== null) {
        const relativePath = match[1];
        const componentPath = path.join(__dirname, relativePath);
        
        if (!fs.existsSync(componentPath)) {
            console.error(`❌ ERROR CRÍTICO: Componente no encontrado: ${componentPath}`);
            process.exit(1);
        }
        
        const componentContent = readFileSyncSafe(componentPath);
        result = result.replace(match[0], componentContent);
        includeRegex.lastIndex = 0;
    }
    return result;
}

function compileHTML() {
    console.log('🔄 Compilando HTML...');
    if (!fs.existsSync(PLANTILLAS_DIR)) {
        console.error(`❌ El directorio de plantillas no existe: ${PLANTILLAS_DIR}`);
        process.exit(1);
    }

    const templateFiles = fs.readdirSync(PLANTILLAS_DIR).filter(file => file.endsWith('.template.html'));

    templateFiles.forEach(file => {
        const templatePath = path.join(PLANTILLAS_DIR, file);
        const outputFileName = file.replace('.template.html', '.html');
        const outputPath = path.join(ROOT_DIR, outputFileName);

        const templateContent = readFileSyncSafe(templatePath);
        const compiledContent = replaceIncludes(templateContent);

        fs.writeFileSync(outputPath, compiledContent, { encoding: 'utf8' });
        console.log(`✅ HTML Listo: ${outputFileName}`);
    });
}

function compileCSS() {
    console.log('🔄 Compilando y minificando Tailwind CSS (v4)...');
    try {
        // Ejecuta el CLI de Tailwind v4
        execSync('npx @tailwindcss/cli -i ./input.css -o ./output.css --minify', { stdio: 'inherit' });
        console.log('✅ CSS Listo y Minificado (output.css)');
    } catch (error) {
        console.error('❌ Error al compilar Tailwind CSS');
        process.exit(1);
    }
}

// Ejecución principal
if (require.main === module) {
    console.log('🚀 Iniciando Trazio Build System...');
    compileHTML();
    compileCSS();
    console.log('✨ Build completado con éxito.');
}