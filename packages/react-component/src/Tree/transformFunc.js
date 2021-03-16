const filterUploadState = (folder, file, last = false) => {
    if (folder.uploadState === 2 && file.uploadState === 0) {
        return 0;
    } else if (folder.uploadState === 2 && file.uploadState === 1 && last) {
        return 1;
    } else if (folder.uploadState === 2 && file.uploadState === 1) {
        return 2;
    } else if (folder.uploadState === 2 && file.uploadState === 2) {
        return 2;
    } else if (folder.uploadState === 1 && file.uploadState === 2) {
        return 2;
    } else if (folder.uploadState === 1 && file.uploadState === 0) {
        return 0;
    } else if (folder.uploadState === 1 && file.uploadState === 1) {
        return 1;
    } else if (folder.uploadState === 0 && file.uploadState === 2) {
        return 0;
    } else if (folder.uploadState === 0 && file.uploadState === 1) {
        return 0;
    } else if (folder.uploadState === 0 && file.uploadState === 0) {
        return 0;
    }
};

const addFolder = (root, split, file, FileList) => {
    let parentIndex = root.children.findIndex((item) => item.name === split[0]);
    // 如果上層Children中沒有資料夾名稱：建立資料夾物件
    if (parentIndex === -1) {
        let folder = {
            relativePath: root.relativePath + split[0] + '/',
            name: split[0],
            children: [],
            size: file.size,
            uploadState: file.uploadState,
            source: file.source,
        };
        root.children.push(folder);
        parentIndex = root.children.length - 1;
    }
    if (split[1].indexOf('.') !== -1) {
        root.children[parentIndex].children.push(file);
    } else {
        split.shift();
        addFolder(root.children[parentIndex], split, file, FileList);
    }
    // 改變父層資料夾狀態
    root.children[parentIndex].size += file.size;
    let deleteState = true;
    root.children[parentIndex].children.forEach((element) => {
        if (element.delete === false) {
            deleteState = false;
        }
    });
    root.children[parentIndex].delete = deleteState;
    root.children[parentIndex].uploadState = filterUploadState(
        root.children[parentIndex],
        file
    );
    return root;
};

export const transformTreeList = (FileList) => {
    let root = {
        name: 'root',
        children: [],
        relativePath: '',
    };
    for (let i = 0; i < FileList.length; i++) {
        const element = FileList[i];
        let split = element.relativePath.split('/');
        // 如果該檔案存在根目錄底下
        if (split[0].indexOf('.') !== -1) {
            root.children.push(FileList[i]);
        } else {
            addFolder(root, split, FileList[i], FileList);
        }
    }
    return root;
};

const addCount = (item, FileList) => {
    let count = 0;
    let str = item.relativePath.replace(item.name, '');
    if (str !== '') {
        for (let i = 0; i < FileList.length; i++) {
            let find = FileList[i].relativePath.indexOf(str);
            if (find !== -1) {
                count += 1;
            }
        }
    }
    return count;
};
