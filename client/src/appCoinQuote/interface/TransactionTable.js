import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// components
import { AppTitle } from "../../sharedComponents/navigation/AppTitle";

// functions
import { convertToReadable } from "../data/convertToReadable";

// styles
import { lighten, makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: "date", numeric: true, disablePadding: true, label: "Date" },
    { id: "baseQty", numeric: true, disablePadding: true, label: "Bought" },
    { id: "baseUnits", numeric: false, disablePadding: true, label: "Units" },
    { id: "quoteQty", numeric: true, disablePadding: true, label: "Cost" },
    { id: "currQuoteQty", numeric: true, disablePadding: true, label: "Cost (curr)" },
    { id: "quoteUnits", numeric: true, disablePadding: true, label: "Units" },
    { id: "costPerUnit", numeric: true, disablePadding: true, label: "Cost/unit" },
    { id: "currCostPerUnit", numeric: true, disablePadding: true, label: "Cost/unit (curr)" },
    { id: "profitLoss", numeric: true, disablePadding: true, label: "Profit/loss" },
    { id: "profitLossPercent", numeric: true, disablePadding: true, label: "Profit/loss (%)" },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all transactions" }}
                    />
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
		minHeight: 0
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    title: {
        flex: "1 1 100%",
    },
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected, handleDeleteRow } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
			})}
			disableGutters
		>            
			{numSelected > 0 && (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            )
            }

			{numSelected > 0 
				&& (<Tooltip title="Delete" style={{marginLeft: "auto"}}>
						<IconButton aria-label="delete" onClick={handleDeleteRow}>
							<DeleteIcon />
						</IconButton>
                	</Tooltip>
				)
			}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
		width: "100%",
		height: "100%"
    },
    paper: {
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    tableRow: {},
    tableCell: {
        paddingLeft: 0,
    },
}));

export const TransactionTable = (props) => {
    const { transactions, setTransactions } = props;

	const theme = useTheme();
    const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = transactions.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleDeleteRow = () => {
		setTransactions(transactions.filter(trans => 
			!selected.includes(trans.id)));
		setSelected([]);
	};

    const handleClick = (e, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = e => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const emptyRows =
        rowsPerPage -
        Math.min(rowsPerPage, transactions.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
				<EnhancedTableToolbar 
					numSelected={selected.length} 
					handleDeleteRow={handleDeleteRow}
				/>
				<TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size="small"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={transactions.length}
                        />
                        <TableBody>
                            {transactions.length > 0 &&
                                stableSort(
                                    transactions,
                                    getComparator(order, orderBy)
                                )
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row, index) => {
                                        const readable = convertToReadable(row);
                                        const isItemSelected = isSelected(
                                            readable.id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={event =>
                                                    handleClick(
                                                        event,
                                                        readable.id
                                                    )
                                                }
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={readable.id}
                                                selected={isItemSelected}
                                                className={classes.tableRow}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            "aria-labelledby": labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.date}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.baseQty}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.baseUnits}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.quoteQty}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.currQuoteQty}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.quoteUnits}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.costPerUnit}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                >
                                                    {readable.currCostPerUnit}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                    style={{
                                                        color:
                                                            row.profitLoss < 0
                                                                ? theme.palette.secondary.main
                                                                : theme.palette.primary.main,
                                                    }}
                                                >
                                                    {readable.profitLoss}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    className={
                                                        classes.tableCell
                                                    }
                                                    style={{
                                                        color:
                                                            row.profitLossPercent <
                                                            0
                                                                ? theme.palette.secondary.main
                                                                : theme.palette.primary.main,
                                                    }}
                                                >
                                                    {readable.profitLossPercent}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 33 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
		</div>
    );
}
