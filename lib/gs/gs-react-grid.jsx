import TableHeader from "grommet/components/TableHeader";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/TableRow";
import React from "react";

const Cell = ({value}) => {
    return (
        <td>{value}</td>
    );
};
Cell.propTypes = {
    value: React.PropTypes.string
};
const Row = ({fields, data}) => {
    return (
        <TableRow>
            {
                fields.map((field, index) => {
                    return (
                        <Cell key={index} value={data[field] + ""}></Cell>
                    );
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
            scrollable={false}>
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