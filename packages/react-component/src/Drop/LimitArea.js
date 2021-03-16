import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useTranslation } from 'react-i18next';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import { analysisParallelFile } from './analysisFunc';

function DropArea({ setFile }) {
    // variables
    const { t } = useTranslation();
    const inputEl = useRef(null);

    // function
    const cancelDefault = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleClick = () => {
        inputEl.current.click();
    };

    const uploadFile = async (event) => {
        let area = event.target.dataset.area;
        let fileList = [];
        if (area === 'dropArea') {
            let items = event.dataTransfer.items;
            let response = await analysisParallelFile(items);
            // let response = await analysisTreeFile(items);
            fileList = response;
        } else if (area === 'inputArea') {
            let files = event.target.files;
            let arr = [];
            for (let i = 0; i < files.length; i++) {
                let obj = {
                    file: files[i],
                    relativePath: files[i].webkitRelativePath + files[i].name,
                    name: files[i].name,
                    size: files[i].size,
                };
                arr.push(obj);
            }
            fileList = arr;
        }
        setFile(fileList);
    };

    // style
    const style = {
        dragDropArea: css`
            background: #fafafa;
            border: #c9caca 1px dotted;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 246px;
            margin-bottom: 11px;
            position: relative;
            .MuiCircularProgress-colorPrimary {
                color: #00aedf;
            }
            span {
                color: #00adef;
                position: relative;
                z-index: 1;
                cursor: pointer;
            }
            .uploadImage {
                font-size: 64px;
                color: #caeafe;
            }
            .smallText {
                margin-top: 10px;
                font-size: 13px;
                color: #9fa0a0;
            }
            .folder-upload {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
            }
            .file-upload {
                display: none;
            }
        `,
        remind: css`
            color: #727171;
            font-size: 14px;
            text-align: center;
            span {
                text-decoration: underline;
            }
        `,
    };

    return (
        <div>
            <div className={style.dragDropArea}>
                <input
                    className="folder-upload"
                    multiple
                    type="file"
                    data-area="dropArea"
                    webkitdirectory="true"
                    onDrop={uploadFile}
                    onClick={cancelDefault}
                />
                <BackupOutlinedIcon draggable="false" className="uploadImage" />
                <p>
                    {t('dataset|drag_drop_tip')}{' '}
                    <span onClick={handleClick}>{t('dataset|browse')}</span>
                </p>
                <p className="smallText">{t('dataset|maximum_single_file_size')}</p>
                <input
                    className="file-upload"
                    type="file"
                    data-area="inputArea"
                    multiple
                    ref={inputEl}
                    onDrop={cancelDefault}
                    onChange={uploadFile}
                />
            </div>
            <p className={style.remind}>{t('dataset|folder_upload_tip')}</p>
        </div>
    );
}

// prop-types
DropArea.propTypes = {
    setFile: PropTypes.func,
};

export default memo(DropArea);
