const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'docs', 'setup', 'test']],
  },
};

export default config;
