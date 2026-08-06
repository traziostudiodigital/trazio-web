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

/**
 * Función para minificar HTML básico.
 * 1. Elimina comentarios HTML (excepto @@include, que ya se habrían procesado).
 * 2. Reduce múltiples espacios/saltos de línea a uno solo.
 * 3. Elimina espacios entre etiquetas HTML.
 * @param {string} html El contenido HTML a minificar.
 * @returns {string} El contenido HTML minificado.
 */
function minifyHTML(html) {
    // 1. Eliminar comentarios HTML (excepto los de @@include, que ya se procesaron)
    // Usamos (?!@@include) para ser robustos, aunque a esta altura ya no deberían existir.
    html = html.replace(/<!--(?!@@include)[^]*?-->/g, '');

    // 2. Eliminar saltos de línea múltiples y espacios en blanco innecesarios
    // Reemplaza múltiples espacios, tabulaciones y saltos de línea con un solo espacio.
    html = html.replace(/\s+/g, ' ');

    // 3. Elimina el espacio entre las etiquetas HTML (e.g., `> <` a `><`)
    html = html.replace(/>\s+</g, '><');

    // 4. Elimina espacios al principio y al final de la cadena minificada.
    html = html.trim();

    return html;
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
        let compiledContent = replaceIncludes(templateContent); // Primero procesar los includes

        // Aplicar la minificación HTML
        compiledContent = minifyHTML(compiledContent); // <-- NUEVO PASO

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