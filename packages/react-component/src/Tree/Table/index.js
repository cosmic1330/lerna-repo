import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { css } from 'emotion';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Item from './Item';

function Tree({ data, errorFunc, checkFunc }) {
    // variables
    const { t } = useTranslation();
    const [select, setSelect] = useState(data?.children[0]?.relativePath);

    // function
    const renderTree = (nodes, index) => (
        <TreeItem
            key={index}
            nodeId={nodes.relativePath}
            className={style.MuiTreeItem}
            label={<Item {...{ nodes, select, errorFunc, checkFunc }} />}
        >
            {Array.isArray(nodes.children)
                ? nodes.children.map((node, index) => renderTree(node, index))
                : null}
        </TreeItem>
    );

    // style
    const style = {
        table: css`
            #table_header {
                display: flex;
                align-items: center;
                padding: 14px 0;
                border-bottom: 1px solid #c9caca;
                #table_header_name {
                    width: 100%;
                    padding-left: 12px;
                }
                #table_header_source {
                    flex-shrink: 0;
                    width: 130px;
                }
                #table_header_size {
                    flex-shrink: 0;
                    width: 100px;
                }
                #table_header_action {
                    flex-shrink: 0;
                    width: 60px;
                }
            }
        `,
        MuiTreeItem: css`
            .MuiTreeItem-iconContainer {
                width: 0;
                margin-right: 0;
            }
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
        <div className={style.table}>
            <div id="table_header">
                <div id="table_header_name">File</div>
                <div id="table_header_source">Source</div>
                <div id="table_header_size">Size</div>
                <div id="table_header_action"></div>
            </div>
            <TreeView
                defaultSelected={data?.children[0]?.relativePath}
                onNodeToggle={(event, nodeIds) => {}}
                onNodeSelect={(event, value) => {
                    console.log('select', value);
                    setSelect(value);
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
Tree.propTypes = {
    data: PropTypes.any,
    errorFunc: PropTypes.func,
    checkFunc: PropTypes.func,
};

export default memo(Tree);
