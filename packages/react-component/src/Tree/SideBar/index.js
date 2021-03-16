import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Item from './Item';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

function PreviewTree({ data, openFunc = () => {} }) {
    // variables
    const [select, setSelect] = useState();

    // function
    const renderTree = (nodes, index) => (
        <TreeItem
            key={index}
            nodeId={nodes.relativePath}
            className={style.MuiTreeItem}
            label={nodes.name !== 'loading.png' && <Item {...{ nodes, select }} />}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node, index) => renderTree(node, index))
                : null}
        </TreeItem>
    );

    // style
    const style = {
        MuiTreeItem: css`
            .MuiTreeItem-label:hover {
                background-color: transparent;
            }
            &.MuiTreeItem-root:focus > .MuiTreeItem-content .MuiTreeItem-label {
                background-color: transparent;
            }
            &.MuiTreeItem-root.Mui-selected
                > .MuiTreeItem-content
                .MuiTreeItem-label:hover {
                background-color: transparent;
            }
            &.MuiTreeItem-root.Mui-selected
                > .MuiTreeItem-content
                .MuiTreeItem-label {
                display: inline-block;
                background-color: transparent;
            }
            &.MuiTreeItem-root.Mui-selected:focus
                > .MuiTreeItem-content
                .MuiTreeItem-label {
                background-color: transparent;
            }
            &.MuiTreeItem-root {
                .MuiTreeItem-content {
                    padding: 7px 0px 7px 5px;
                    color: #727171;
                }
                &.Mui-selected > .MuiTreeItem-content {
                    color: #00adef;
                    background: rgba(0, 173, 239, 0.12) 0% 0% no-repeat padding-box;
                }
            }
        `,

    };
    return (
        <div>
            <TreeView
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                onNodeToggle={(event, nodeIds) => {}}
                onNodeSelect={(event, value) => {
                    setSelect(value);
                    if (value.indexOf('.') === -1) {
                        openFunc(value);
                    }
                }}
            >
                {Array.isArray(data.children)
                    ? data.children.map((nodes, index) => renderTree(nodes, index))
                    : null}
            </TreeView>
        </div>
    );
}

// prop-types
PreviewTree.propTypes = {
    data: PropTypes.any,
    openFunc: PropTypes.func,
};

export default memo(PreviewTree);
