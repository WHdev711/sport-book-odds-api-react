import React, { Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 25 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Table bordered hover {...getTableProps()} style={{padding: '0.05rem'}}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} style={{padding: '0.05rem'}}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length} style={{padding: '0.05rem'}}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 'auto', margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            color='primary'
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={1}>
          <Input
            type='number'
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        {/* <Col md={1}>
          <CustomInput
            type='select'
            value={pageSize}
            onChange={onChangeInSelect}
          >
            >
            {[25, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CustomInput>
        </Col> */}
        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
