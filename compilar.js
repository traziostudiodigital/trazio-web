/**
 * compilar.js
 * -----------
 * Simple offline HTML compiler.
 *
 * It reads the master template located at `plantillas/portafolio-creativo.template.html`
 * and replaces every include comment of the form:
 *   <!-- @@include(componentes/filename.html) -->
 * with the contents of the referenced component file inside the `componentes/`
 * directory. The final compiled HTML is written to the project root as
 * `portafolio-creativo.html`.
 *
 * The script uses only Node's built‑in `fs` and `path` modules – no external
 * dependencies are required, making it 100% offline and zero‑dependency.
 */

const fs = require('fs');
const path = require('path');

// Paths (relative to the project root) - CORREGIDO AQUÍ
const TEMPLATE_PATH = path.join(__dirname, 'plantillas', 'portafolio-creativo.template.html');
const OUTPUT_PATH = path.join(__dirname, 'portafolio-creativo.html');
const COMPONENTS_DIR = path.join(__dirname, 'componentes');

/**
 * Reads a file synchronously and returns its content as a string.
 */
function readFileSyncSafe(filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
}

/**
 * Replaces all include directives in the supplied HTML string.
 */
function replaceIncludes(html) {
    const includeRegex = /<!--\s*@@include\((componentes\/[^)]+)\)\s*-->/g;
    return html.replace(includeRegex, (match, relativePath) => {
        const componentPath = path.join(__dirname, relativePath);
        if (!fs.existsSync(componentPath)) {
            console.error(`Component not found: ${componentPath}`);
            return match; // leave the original comment so the user can see the issue
        }
        return readFileSyncSafe(componentPath);
    });
}

function compile() {
    if (!fs.existsSync(TEMPLATE_PATH)) {
        console.error(`Template file not found at ${TEMPLATE_PATH}`);
        process.exit(1);
    }

    const templateContent = readFileSyncSafe(TEMPLATE_PATH);
    const compiledContent = replaceIncludes(templateContent);

    fs.writeFileSync(OUTPUT_PATH, compiledContent, { encoding: 'utf8' });
    console.log(`✅ Compiled HTML written to ${OUTPUT_PATH}`);
}

// Execute when the script is run directly
if (require.main === module) {
    compile();
}