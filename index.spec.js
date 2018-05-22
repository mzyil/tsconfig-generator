const assert = require('assert');
const execSync = require('child_process').execSync;
const fs = require('fs');

describe('tsconfig-generator', () =>{
    const generatedFilePath = 'test/tsconfig.json';

    before(() =>{
        process.env['TEST_NODE_PATH'] = '/tmp/test/node/path';
        process.env['TEST_GIT_ROOT'] = '/tmp/test/git/root';
    });

    after(() => {
        fs.unlink(generatedFilePath);
    });

    it('can generate the tsconfig.json with environment variables', () =>
    {
        let expectedFileBuffer = null; 
        let generatedFileBuffer = null; 

        let inputFilePath = 'test/tsconfig.base1.json';
        let expectedFilePath = 'test/tsconfig.expected1.json';
        execSync(`./index.js -i ${inputFilePath} -o ${generatedFilePath}`);
        assert(checkFileEquality(expectedFilePath, generatedFilePath));
    });

    function checkFileEquality(expectedFilePath, generatedFilePath){
        expectedFileBuffer = fs.readFileSync(expectedFilePath);
        generatedFileBuffer = fs.readFileSync(generatedFilePath);
        console.log(generatedFileBuffer)
        console.log(process.env.TRAVIS_BUILD_DIR)
        return expectedFileBuffer.equals(generatedFileBuffer);
    }
});