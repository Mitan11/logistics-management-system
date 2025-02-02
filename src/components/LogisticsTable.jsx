import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Collapse,
  Grid,
  Chip,
  Button,
  CircularProgress,
  TablePagination,
  FormControlLabel,
  Switch,
  Toolbar,
  Tooltip,
  Checkbox,
  TextField,
  Alert,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocationOn,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { visuallyHidden } from "@mui/utils";
import { alpha } from "@mui/material/styles";

// Sorting logic
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

// Toolbar
function EnhancedTableToolbar({ numSelected, onFilter }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Bids
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <TextField
            size="small"
            placeholder="Filter bids..."
            onChange={(e) => onFilter(e.target.value)}
          />
        </Tooltip>
      )}
    </Toolbar>
  );
}

// Expandable row component
function Row({ row, isItemSelected, handleClick }) {
  const [open, setOpen] = useState(false);
  const labelId = `enhanced-table-checkbox-${row.id}`;

  return (
    <>
      <TableRow
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#4CAF50",
              }}
            />
            <Typography variant="body2">{row.sNo}</Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
            {row.bidNumber}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.createdBy}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.startDate}</Typography>
          <Typography variant="caption" color="text.secondary">
            {row.startTime}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.bidTimeRemaining}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.fromCity}</Typography>
          <Typography variant="caption" color="text.secondary">
            {row.toCity}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.vehicleType}</Typography>
          <Typography variant="caption" color="text.secondary">
            Close body, 1
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.materialWeight}</Typography>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              "&:hover": { bgcolor: "primary.light" },
            }}
          >
            {row.response}
            <br />
            View results
          </Button>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{row.assignedStaff}</Typography>
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              "&:hover": { bgcolor: "primary.dark" },
            }}
            onClick={() => setOpen(!open)}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Bid No: {row.bidNumber} ({row.createdBy})
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <LocationOn color="error" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Loading Point:
                      </Typography>
                      <Typography variant="body2">
                        {row.loadingPoint}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
                  >
                    <LocationOn color="primary" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Unloading Point:
                      </Typography>
                      <Typography variant="body2">
                        {row.unloadingPoint}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle loading date:
                      </Typography>
                      <Typography variant="body2">
                        {row.vehicleLoadingDate}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Vehicle Type:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {row.vehicleType}
                        <Chip label="CNG" size="small" color="success" />
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Material:
                      </Typography>
                      <Typography variant="body2">
                        {row.material} Weight: {row.weight}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Request Date:
                      </Typography>
                      <Typography variant="body2">{row.requestDate}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Expiry Date:
                      </Typography>
                      <Typography variant="body2">{row.expiryDate}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Target Price:
                      </Typography>
                      <Typography variant="body2">{row.targetPrice}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Number of Bids:
                      </Typography>
                      <Typography variant="body2">
                        {row.numberOfBids}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Remarks:
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {row.remarks}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function LogisticsTable() {
  const { bids, loading, error } = useAuth();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("bidNumber");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = bids.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleFilter = (filterText) => {
    setFilter(filterText);
  };

  const filteredRows = React.useMemo(() => {
    return bids.filter((row) =>
      Object.values(row).some(
        (value) =>
          value && value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [bids, filter]);

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onFilter={handleFilter}
        />
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            stickyHeader
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell>S No.</TableCell>
                <TableCell>Bid Number</TableCell>
                <TableCell>Start Date & Time</TableCell>
                <TableCell>Bid Time Remaining</TableCell>
                <TableCell>From City / To City</TableCell>
                <TableCell>Vehicle Type-Size</TableCell>
                <TableCell>Material Weight (in Kg)</TableCell>
                <TableCell>Response</TableCell>
                <TableCell>Assigned Staff</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <Row
                    key={row.id}
                    row={row}
                    isItemSelected={isItemSelected}
                    handleClick={handleClick}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
