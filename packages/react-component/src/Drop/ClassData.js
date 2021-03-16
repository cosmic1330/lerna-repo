class FileObjData {
    constructor(file, path, source = 'Local Drive') {
        this.file = file;
        this.relativePath = path + file.name;
        this.name = file.name;
        this.size = file.size;
        this.source = source;
        this.uploadState = 2;
        this.cacnelToekn = file.name;
        this.analysis = true;
        this.delete = false;
    }

    setCancelToken(cacnelToekn) {
        this.cacnelToekn = cacnelToekn;
        return this;
    }

    setAnalysis(analysis) {
        this.analysis = analysis;
        return this;
    }

    setUploadState(uploadState) {
        this.uploadState = uploadState;
        return this;
    }
}
export default FileObjData;
