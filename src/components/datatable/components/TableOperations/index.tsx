import { FC } from "react";
import TableOperationsWrapper from "./styles/TableOperationsWrapper";
import { TableOperationProps } from "./types/TableOperations.types";

const TableOperations: FC<TableOperationProps> = ({
  tableOperations = <></>,
}) => {
  return <TableOperationsWrapper>{tableOperations}</TableOperationsWrapper>;
};

export default TableOperations;
