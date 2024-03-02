import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    ThemeProvider,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import { PositionTickers } from '../../interfaces/IPositionsModel';

type Order = 'asc' | 'desc';

interface EnhancedTableToolbarProps {
    numSelected: number;
    handleDeleteStocks: () => void;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof PositionTickers;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'purchaseDate',
        numeric: true,
        disablePadding: false,
        label: 'Purchase Date'
    },
    {
        id: 'symbol',
        numeric: false,
        disablePadding: false,
        label: 'Symbol'
    },
    {
        id: 'quantity',
        numeric: true,
        disablePadding: false,
        label: 'Quantity'
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Current Price'
    },
    {
        id: 'purchasePrice',
        numeric: true,
        disablePadding: false,
        label: 'Cost Basis'
    },
    {
        id: 'priceChange',
        numeric: true,
        disablePadding: false,
        label: 'Price Change'
    },
    {
        id: 'gainOrLoss',
        numeric: true,
        disablePadding: false,
        label: 'Gain/Loss'
    },
    {
        id: 'marketValue',
        numeric: true,
        disablePadding: false,
        label: 'Market Value'
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PositionTickers) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function PositionsTHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof PositionTickers) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const [isDeleteWatchlistTickers, setDeleteWatchlistTickers] = useState(false);

    const onCancelDeleteTickers = () => {
        setDeleteWatchlistTickers(false);
    };

    const onConfirmDeleteTickers = () => {
        props.handleDeleteStocks();
        setDeleteWatchlistTickers(false);
    };

    const theme = createTheme({
        components: {
            // Name of the component
            MuiToolbar: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }
                }
            }
        }
    });
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={theme}>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    display: 'flex',
                    justifyItems: 'space-between',
                    flexDirection: 'row'
                }}
            >
                {numSelected > 0 ? (
                    <Typography sx={{}} color="inherit" variant="subtitle1" component="div">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography sx={{}} variant="h6" id="tableTitle" component="div">
                        Tickers
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setDeleteWatchlistTickers(true)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <></>
                )}
            </Toolbar>
            <Dialog open={isDeleteWatchlistTickers} onClose={onCancelDeleteTickers} fullScreen={fullScreen}>
                <DialogTitle>{`Delete selected tickers`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete these selected watchlist tickers? Once deleted, they won't be recoverable.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelDeleteTickers}>Cancel</Button>
                    <Button onClick={onConfirmDeleteTickers}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
