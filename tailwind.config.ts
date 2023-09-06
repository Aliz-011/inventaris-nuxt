import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  content: ['docs/content/**/*.md'],
  theme: {
    extend: {
      // Configure A4 paper size and margins
      screens: {
        a4: '210mm',
      },
      spacing: {
        a4: '8.27in', // A4 height
        'a4-margin': '0.5in', // A4 margin
      },
    },
  },
};
