// tech-contact-form.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tech-contact-form');
    if (!form) return; // seguridad: si el formulario no existe, no hacemos nada

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const empresa = document.getElementById('empresa').value.trim();
        const presupuesto = document.getElementById('presupuesto').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();

        if (!empresa || !presupuesto || !descripcion) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const message = encodeURIComponent(
            `Hola Trazio Studio, quiero cotizar mi Dossier Interactivo para ${empresa}. ` +
            `Presupuesto estimado: ${presupuesto}. Descripción: ${descripcion}`
        );

        // Número de WhatsApp (ajústalo si usas otro)
        const whatsappNumber = '5350000000';
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

        form.reset(); // limpiar el formulario tras enviar
    });
});