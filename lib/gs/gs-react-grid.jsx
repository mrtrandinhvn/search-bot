import TableHeader from "grommet/components/TableHeader";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import React from "react";
import "./gs-react-grid.css";
import { ERROR, DONE, IN_PROGRESS } from "../../js/actions/data-action";
const cellType = {
    link: "LINK",
    text: "TEXT"
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
                            return (
                                <span style={{
                                    backgroundColor: "red",
                                    padding: "5px"
                                }}>{value}</span>
                            );
                        case DONE:
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
const Row = ({fields, data}) => {
    return (
        <TableRow>
            {
                fields.map((field, index) => {
                    switch (field) {
                        case "searchLink":
                            return (
                                <Cell key={index} value={data[field] + ""} type={cellType.link}></Cell>
                            );
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
    data: React.PropTypes.object.isRequired
};
// const columns=[{field:"A", label:"aaa"}]
const GsGrid = ({columns, data, sortIndex, sortAscending}) => {
    return (
        <Table selectable={true}
            scrollable={false}
            className="gs-react-grid">
            <TableHeader labels={
                columns.map((col) => {
                    return col.label;
                })
            }
                sortIndex={sortIndex}
                sortAscending={sortAscending} >
            </TableHeader>
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
                                }></Row>
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
    sortAscending: React.PropTypes.bool.isRequired
};
export default GsGrid;