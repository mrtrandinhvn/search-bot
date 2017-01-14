import TableHeader from "grommet/components/TableHeader";
import Table from "grommet/components/Table";
import TableRow from "grommet/components/Table";
import React from "react";
const headers = ["Name", "Note"];

const Row = () => {
    return (
        <div></div>
    );
};

const GsReactGrid = ({headers}) => {
    return (
        <Table>
            <TableHeader labels={headers}
                sortIndex={0}
                sortAscending={true} >
            </TableHeader>
            <tbody>
                <TableRow>
                    <td>
                    </td>
                    <td>
                    </td>
                </TableRow>
            </tbody>
        </Table>

    );
};
export default GsReactGrid;