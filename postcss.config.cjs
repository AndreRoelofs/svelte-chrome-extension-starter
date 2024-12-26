module.exports = {
    plugins: [
        require('postcss-import'),
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('tailwindcss')('./tailwind.config.cjs'),
        require('autoprefixer'),
    ],
};
