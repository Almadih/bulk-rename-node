#! /usr/bin/env node
const yargs = require('yargs');
const process = require('process');
const { getFiles, printFileList, renameFile, insertChar, removeSubstringRange, removeFileExtension, replace, getFileExtension } = require('../utils');
const workDir = process.cwd();


const replaceSubString = (args) => {

    getFiles(workDir, args.ext).map(file => {
        const fileExtenstion = getFileExtension(file);
        const fileNameWithoutExtenstion = removeFileExtension(file);
        const newFileName = replace(fileNameWithoutExtenstion, args.str, args.with);
        renameFile(workDir, file, newFileName + fileExtenstion);
    });
    printFileList(workDir, args.ext);



};

const deleteSubString = (args) => {
    const from = parseInt(args.from);
    if (!from) {
        console.log('from must be a number');
        return;
    }
    const to = args.to ?? -1;

    getFiles(workDir, args.ext).map(file => {
        const fileExtenstion = getFileExtension(file);
        const fileNameWithoutExtenstion = removeFileExtension(file);
        const newFileName = removeSubstringRange(fileNameWithoutExtenstion, from, to);
        renameFile(workDir, file, newFileName + fileExtenstion);
    });
    printFileList(workDir, args.ext);
};;


const insert = (args) => {
    getFiles(workDir, args.ext).map(file => {
        const fileExtenstion = getFileExtension(file);
        const fileNameWithoutExtenstion = removeFileExtension(file);
        const newFileName = insertChar(fileNameWithoutExtenstion, args.index, args.str);
        renameFile(workDir, file, newFileName + fileExtenstion);
    });
    printFileList(workDir, args.ext);
};


const usage = "\n$0 <cmd> [args]"; const options = yargs
    .usage(usage)
    .command('list', 'List files in current directory', {
    }, function (argv) {
        printFileList(workDir, argv.ext);
    }).command('replace', 'Replace substring with another string', {
        'str': {
            demandOption: true
        },
        'with': {
            demandOption: true
        }
    }, function (argv) {
        replaceSubString(argv);

    }).command('delete', 'Delete substring from filename', {
        'from': {
            demandOption: true,
            type: 'number'
        },
        'to': {
            type: 'number'
        }
    }, function (argv) {
        deleteSubString(argv);
    })
    .command('insert', 'Insert substring into filename', {
        'str': {
            demandOption: true
        },
        'index': {
            demandOption: true,
        }
    }, function (argv) {
        insert(argv);
    })
    .option('ext', {
        describe: 'Extension of files to work on',
        type: 'string',
        default: 'all',
    }).demandCommand(1, 'You need at least one command before moving on')
    .help(true)
    .argv;