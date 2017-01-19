import TableHeader from "grommet/components/TableHeader";
// import Table from "grommet/components/Table";
// import TableRow from "grommet/components/TableRow";
import React from "react";
import "./gs-react-grid.css";
import { ERROR, DONE, IN_PROGRESS, EXISTS, NOT_FOUND } from "../../js/actions/data-action";
const cellType = {
    link: "LINK",
    text: "TEXT"
};
const Table = (props) => {
    return (
        <table {...props}>{props.children}</table>
    );
};
const TableRow = (props) => {
    return (
        <tr {...props}>{props.children}</tr>
    );
};
const Cell = ({type, value}) => {
    return (
        <td className="gs-react-cell">{(() => {
            switch (type) {
                case cellType.link:
                    return (
                        <a href={value} target="_blank" rel="noopener">{value}</a>
                    );
                default:
                    switch (value) {
                        case ERROR:
                        case NOT_FOUND:
                            return (
                                <span style={{
                                    backgroundColor: "red",
                                    padding: "5px"
                                }}>{value}</span>
                            );
                        case DONE:
                        case EXISTS:
                            return (
                                <span style={{
                                    backgroundColor: "green",
                                    padding: "5px"
                                }}>{value}</span>
                            );
                        case IN_PROGRESS:
                            return (
                                <span style={{
                                    backgroundColor: "yellow",
                                    padding: "5px"
                                }}>{value}</span>
                            );
                        default:
                            return (
                                <span style={{
                                    padding: "5px"
                                }}>{value}</span>
                            );
                    }
            }
        })()}</td>
    );
};
Cell.propTypes = {
    type: React.PropTypes.string,
    value: React.PropTypes.string
};
const Row = ({fields, data, onClick}) => {
    return (
        <TableRow
            onClick={() => {
                onClick(data.id);
            } }
            >
            {
                fields.map((field, index) => {
                    switch (field) {
                        default:
                            return (
                                <Cell key={index} value={data[field] + ""} type={cellType.text}></Cell>
                            );
                    }
                })
            }
        </TableRow>
    );
};
Row.propTypes = {
    fields: React.PropTypes.array.isRequired,
    data: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};
// const columns=[{field:"A", label:"aaa"}]
const GsGrid = ({columns, data, sortIndex, sortAscending, onRowClick}) => {
    return (
        <Table selectable={true}
            scrollable={false}
            className="gs-react-grid">

            {
                //     <TableHeader
                //                 labels={
                //                     columns.map((col) => {
                //                         return col.label;
                //                     })
                //                 }
                //                 sortIndex={sortIndex}
                //                 sortAscending={sortAscending}
                //                 >
                // </TableHeader>
            }
            <tbody>
                {
                    data.map((item, index) => {
                        return (
                            <Row key={item.id ? item.id : index}
                                data={item}
                                fields={
                                    columns.map(
                                        (col) => {
                                            return col.field;
                                        }
                                    )
                                }
                                onClick={onRowClick}
                                >
                            </Row>
                        );
                    })
                }
            </tbody>
        </Table>
    );
};
GsGrid.propTypes = {
    columns: React.PropTypes.array.isRequired,
    data: React.PropTypes.array.isRequired,
    sortIndex: React.PropTypes.number.isRequired,
    sortAscending: React.PropTypes.bool.isRequired,
    onRowClick: React.PropTypes.func
};
export default GsGrid;