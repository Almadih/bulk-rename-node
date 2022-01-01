const fs = require('fs');
const path = require('path');

const filterFilesWithExtension = (files, extension) => {
    return files.filter(file => {
        return path.extname(file) === `.${extension}`;
    });
};

const getFiles = (dir, extension = 'all') => {
    const files = fs.readdirSync(dir);
    return extension === 'all' ? files : filterFilesWithExtension(files, extension);
};

const replace = (filename, expression, replaced) => {
    return filename.replaceAll(expression, replaced);
};


const getFileExtension = (filename) => {
    return path.extname(filename);
};

const removeSubstringRange = (str, start, end) => {
    end = end === -1 ? str.length : end;
    return str.substring(0, start) + str.substring(end);
};

const insertChar = (str, index, char) => {
    return str.substr(0, index) + char + str.substr(index);
};
const renameFile = (workDir, file, newName) => {
    fs.renameSync(path.join(workDir, file), path.join(workDir, newName));
};

const printFileList = (workDir, extension = 'all') => {
    getFiles(workDir).map(file => {
        if (extension == 'all') {
            console.log(file);
        } else {
            if (getFileExtension(file) == `.${extension}`) {
                console.log(file);
            }
        }
    });
};

const removeFileExtension = (filename) => {
    return filename.substring(0, filename.lastIndexOf('.'));
};


module.exports = {
    getFiles,
    replace,
    getFileExtension,
    removeSubstringRange,
    insertChar,
    renameFile,
    printFileList,
    removeFileExtension
};