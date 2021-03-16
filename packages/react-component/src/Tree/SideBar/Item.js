import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import FileType from 'components/Common/FilterFileType';

function Item({ nodes, select }) {
    // variables
    const { t } = useTranslation();

    // function

    // style
    const style = css`
        display: flex;
        align-items: center;
        position: relative;
        .wearnIcon {
            position: absolute;
            left: -25px;
            color: #ffc307;
        }
        p {
            margin-left: 5px;
            overflow: hidden;
            width: 180px;
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: nowrap;
        }
    `;
    return (
        <Tooltip title={nodes.name}>
            <div className={style}>
                {!nodes.analysis && !Array.isArray(nodes.children) && (
                    <ReportProblemIcon className="wearnIcon" fontSize="small" />
                )}
                <FileType file={nodes} select={nodes.relativePath === select} />
                <p>{nodes.name}</p>
            </div>
        </Tooltip>
    );
}

// prop-types
Item.propTypes = {
    nodes: PropTypes.any,
    select: PropTypes.any,
};

export default memo(Item);
