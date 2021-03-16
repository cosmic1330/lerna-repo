import FileObjData from './ClassData';
// 平行檔案格式
function analysisParallelFile(dataTransferItems) {
    function traverseFileParallelPromise(item, path = '') {
        return new Promise((resolve) => {
            if (item && item.isFile) {
                item.file((file) => {
                    let data = new FileObjData(file, path);
                    files.push(data);
                    resolve(file);
                });
            } else if (item && item.isDirectory) {
                let dirReader = item.createReader();
                dirReader.readEntries((entries) => {
                    let tasks = [];
                    for (let entr of entries)
                        tasks.push(
                            traverseFileParallelPromise(entr, path + item.name + '/')
                        );
                    resolve(Promise.all(tasks));
                });
            }
        });
    }

    let files = [];
    return new Promise((resolve, reject) => {
        let tasks = [];
        for (let it of dataTransferItems)
            tasks.push(traverseFileParallelPromise(it.webkitGetAsEntry()));
        Promise.all(tasks).then((entries) => {
            resolve(files);
        });
    });
}

// 樹狀檔案格式
const traverseFileTreePromise = (item, path) => {
    return new Promise((resolve) => {
        if (item && item.isFile) {
            item.file((file) => {
                let data = new FileObjData(file, path);
                resolve(data);
            });
        } else if (item && item.isDirectory) {
            let dirReader = item.createReader();
            let fileList = {
                name: item.name,
                relativePath: path + item.name + '/',
                children: [],
            };
            let finish = [];
            dirReader.readEntries((entries) => {
                for (let i = 0; i < entries.length; i++) {
                    const element = entries[i];
                    let response = traverseFileTreePromise(
                        element,
                        path + item.name + '/'
                    );
                    finish.push(response);
                }
                Promise.all(finish).then((finished) => {
                    fileList.children.push(...finished);
                    resolve(fileList);
                });
            });
        }
    });
};

const analysisTreeFile = (items) => {
    return new Promise((resolve, reject) => {
        let fileList = [];
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            let response = traverseFileTreePromise(element.webkitGetAsEntry(), '');
            fileList = [...fileList, response];
        }
        Promise.all(fileList).then((entries) => {
            resolve(entries);
        });
    });
};

export { analysisParallelFile, analysisTreeFile };
