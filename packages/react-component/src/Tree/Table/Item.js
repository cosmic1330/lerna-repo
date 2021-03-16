import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import FileType from 'components/Common/FilterFileType';
import { filterByte } from 'utils/filterAssembly';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

function Item({ nodes, select, errorFunc = () => {}, checkFunc = () => {} }) {
    // variables
    const { t } = useTranslation();
    // function
    if (nodes.delete) {
        return false;
    }
    
    const handleError = (even) => {
        even.stopPropagation();
        if (!nodes.hasOwnProperty('children')) {
            errorFunc(nodes);
        }
    };
    const handleCheck = (even) => {
        even.stopPropagation();
        checkFunc(nodes);
    };
    const handleUpload = (even) => {
        even.stopPropagation();
        if (!nodes.hasOwnProperty('children')) {
            nodes.cacnelToekn.cancel();
        }
    };

    // style
    const style = css`
        padding: 7px 0px 7px 5px;
        border-bottom: 1px solid #eaeaea;
        &.file_content {
            display: flex;
            align-items: center;
            .file_content_name {
                display: flex;
                flex-basis: 100%;
                max-width: calc(100% - 290px);
                .NameArea {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    padding-left: 12px;
                    max-width: calc(100% - 50px);
                }
            }
            .file_content_source {
                flex-shrink: 0;
                width: 130px;
            }
            .file_content_size {
                flex-shrink: 0;
                width: 100px;
            }
            .file_content_action {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                flex-shrink: 0;
                width: 60px;
                .wearnIcon {
                    color: #ffc307;
                }
                .MuiIconButton-root {
                    padding: 5px;
                    svg:nth-of-type(1):not(.MuiCircularProgress-svg):not(.errorIcon) {
                        opacity: 0;
                        position: absolute;
                    }
                    &:hover svg:nth-of-type(1):not(.MuiCircularProgress-svg) {
                        opacity: 1;
                        position: relative;
                    }
                    &:hover svg:nth-of-type(2),
                    &:hover .MuiCircularProgress-root:not(.uploadIcon) {
                        opacity: 0;
                        position: absolute;
                    }
                }
            }
        }
    `;
    return (
        <div className={`${style} file_content`}>
            <div className="file_content_name">
                <FileType file={nodes} select={nodes.relativePath === select} />
                <div className="NameArea">
                    <Tooltip title={nodes.name} placement="bottom-start">
                        <span>{nodes.name}</span>
                    </Tooltip>
                </div>
            </div>
            <div className="file_content_source">{nodes.source}</div>
            <div className="file_content_size">
                {!Array.isArray(nodes.children) && filterByte(nodes.size)}
                {Array.isArray(nodes.children) && '-'}
            </div>
            <div className="file_content_action">
                {!nodes.analysis && !Array.isArray(nodes.children) && (
                    <ReportProblemIcon className="wearnIcon" fontSize="small" />
                )}
                {nodes.uploadState === 1 && (
                    <IconButton onClick={handleCheck}>
                        <ClearIcon fontSize="small" />
                        <CheckCircleIcon
                            fontSize="small"
                            style={{ color: '#8fc351' }}
                        />
                    </IconButton>
                )}
                {nodes.uploadState === 0 && (
                    <IconButton onClick={handleError}>
                        {!nodes.hasOwnProperty('children') && (
                            <ClearIcon fontSize="small" />
                        )}
                        <ErrorIcon
                            className={
                                nodes.hasOwnProperty('children') && 'errorIcon'
                            }
                            fontSize="small"
                            style={{ color: '#ea645e' }}
                        />
                    </IconButton>
                )}
                {nodes.uploadState === 2 && (
                    <IconButton onClick={handleUpload}>
                        {!nodes.hasOwnProperty('children') && (
                            <ClearIcon fontSize="small" />
                        )}
                        <CircularProgress
                            className={
                                nodes.hasOwnProperty('children') && 'uploadIcon'
                            }
                            color="inherit"
                            style={{
                                color: '#00adef',
                                width: '20px',
                                height: '20px',
                            }}
                        />
                    </IconButton>
                )}
            </div>
        </div>
    );
}

// prop-types
Item.propTypes = {
    nodes: PropTypes.any,
    select: PropTypes.any,
    errorFunc: PropTypes.func,
    checkFunc: PropTypes.func,
};

export default Item;
