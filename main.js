import { CADViewer } from './viewer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the 3D Viewport
    const viewer = new CADViewer('viewport-container');
    console.log("Fusion Lite Viewport Initialized.");

    // Hook up Toolbar Buttons
    document.getElementById('btn-extrude').addEventListener('click', () => {
        alert("Extrude command activated. (Awaiting OpenCascade.js WebWorker)");
        // Future logic: Send message to cad-worker.js to extrude selected sketch
    });

    document.getElementById('btn-fillet').addEventListener('click', () => {
        alert("Fillet command activated. Please select an edge.");
    });

    document.getElementById('btn-math').addEventListener('click', () => {
        const formula = prompt("Enter a formula for Pyodide/SymPy to integrate:", "x**2");
        if(formula) {
            console.log(`Sending ${formula} to Pyodide worker...`);
            // Future logic: Send to pyodide web worker
        }
    });
});
