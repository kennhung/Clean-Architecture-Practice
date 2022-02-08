const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
    clearMocks: true,
    collectCoverage: false,
    testEnvironment: 'node',
    testPathIgnorePatterns: [
        '/node_modules/',
        '/build/',
    ],
    transform: {
        ...tsjPreset.transform,
    },
    watchPathIgnorePatterns: ['globalConfig'],
};