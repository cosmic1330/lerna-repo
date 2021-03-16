import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import FileType from 'components/Common/FilterFileType';
import { filterByte } from 'utils/filterAssembly';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import Tooltip from '@material-ui/core/Tooltip';

function Item({ nodes, select, checkFunc = () => {} }) {
    // variables
    const [disabled, setDisabled] = useState(false);
    const { t } = useTranslation();
    // function
    const handleCheck = (even) => {
        even.stopPropagation();
        setDisabled(true);
        checkFunc(nodes);
    };

    if (nodes.delete) {
        return false;
    }

    // style
    const style = css`
        border-bottom: 1px solid #eaeaea;
        padding: 7px 0px 7px 5px;
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
                    <IconButton onClick={handleCheck} disabled={disabled}>
                        <ClearIcon fontSize="small" />
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
    checkFunc: PropTypes.func,
};

export default Item;
