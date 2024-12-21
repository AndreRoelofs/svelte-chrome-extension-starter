/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Adjust these globs to your Nx workspace structure
        './apps/**/*.{html,svelte,ts,js}',
        './libs/**/*.{html,svelte,ts,js}',
        // Optionally include other folder globs if needed
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
