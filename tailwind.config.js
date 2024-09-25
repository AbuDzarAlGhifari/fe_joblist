const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poetsen: ['Poetsen One, sans-serif'],
        noto: ['Noto Sans, sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(70deg, rgba(95,0,129,0.7) 100%, rgba(34,15,46,0.7) 100%)',
      },
    },
  },
  plugins: [],
});
