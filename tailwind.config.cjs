/** @type {import('tailwindcss').Config}*/
const config = {
    content: [
        "./apps/**/*.{html,js,svelte,ts}",
        "./libs/**/*.{html,js,svelte,ts}"
    ],

	theme: {
		extend: {},
	},

	plugins: [],
};

module.exports = config;