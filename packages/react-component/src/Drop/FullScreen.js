import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useTranslation } from 'react-i18next';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import Button from '@material-ui/core/Button';
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

    const style = {
        button: css`
            display: inline-block;
            position: relative;
            .MuiButton-outlined {
                border: 1px dashed #00adef;
                text-transform: unset;
                color: #00adef;
                cursor: pointer;
            }
            input {
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;
                left: 0;
                opacity: 0;
            }
            .smallText {
                display: inline-block;
                margin-left: 15px;
                font-size: 13px;
                color: #9fa0a0;
            }
        `,
        input: css`
            display: none;
        `,
    };

    return (
        <div>
            <div className={style.button}>
                <input
                    className="folder-upload"
                    multiple
                    type="file"
                    data-area="dropArea"
                    webkitdirectory="true"
                    onDrop={uploadFile}
                    onClick={cancelDefault}
                />
                <Button
                    variant="outlined"
                    onClick={handleClick}
                    startIcon={
                        <BackupOutlinedIcon
                            style={{
                                color: '#CAEAFE',
                            }}
                        />
                    }
                >
                    {t('dataset|upload_more_files')}
                </Button>
                <p className="smallText">{t('dataset|maximum_single_file_size')}</p>
            </div>
            <input
                className={style.input}
                type="file"
                multiple
                data-area="inputArea"
                ref={inputEl}
                onDrop={cancelDefault}
                onChange={uploadFile}
            />
        </div>
    );
}

// prop-types
DropArea.propTypes = {
    setFile: PropTypes.func,
};

export default memo(DropArea);
