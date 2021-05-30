import React, { useEffect, useState } from "react";
import { useTable } from "react-table";

import "./Table.css";
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className="inputEdit"
      value={value !== null ? value : ""}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

const NotEditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
}) => {
  return <React.Fragment>{initialValue}</React.Fragment>;
};

const nonEditableColumn = {
  Cell: NotEditableCell,
};

export default function EditableTable({ columns, data, updateMyData }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, defaultColumn, updateMyData });

  return (
    <table {...getTableProps()} className="table">
      <thead className="tableHeader">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="tableBody">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="tableRow">
              {row.cells.map((cell, i) => {
                return (
                  <td {...cell.getCellProps()}>
                    {i !== row.allCells.length - 1
                      ? cell.render("Cell")
                      : cell.render(NotEditableCell)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
