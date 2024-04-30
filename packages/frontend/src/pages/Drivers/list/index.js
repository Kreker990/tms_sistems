import { Button, IconButton, Table } from 'rsuite';
import { useState } from 'react';
import AddEdit from '../edit';
import PlusIcon from '@rsuite/icons/Plus';

const { Column, HeaderCell, Cell } = Table;

export const List = ({data}) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [driverData, setData] = useState(null);

const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <>
      <div className='driver-header'>Водители <IconButton onClick={() => {
        setData(null);
        handleOpen();
      }} icon={<PlusIcon />}>Add</IconButton></div>
    <Table
      height={420}
      data={data}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
    >
      <Column width={70} align="center" fixed sortable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column width={130} fixed sortable>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column width={100} sortable>
        <HeaderCell>CarNumber</HeaderCell>
        <Cell dataKey="carNumber" />
      </Column>

      <Column width={100} sortable>
        <HeaderCell>Contact</HeaderCell>
        <Cell dataKey="contact" />
      </Column>

      <Column width={200} sortable>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="mail" />
      </Column>
      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
              <Button appearance="link" onClick={() => {
                setData(rowData);
                handleOpen();
              }}>
              Edit
            </Button>
          )}
        </Cell>
      </Column>
      </Table>
      {
        open && <AddEdit handleClose={handleClose} open={open} data={driverData} />
      }
      </>
  );
};
