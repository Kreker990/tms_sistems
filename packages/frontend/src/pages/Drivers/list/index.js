import { Button, Table } from 'rsuite';
import { useState } from 'react';
import AddEdit from '../edit';
import { useDispatch } from 'react-redux';
import { deleteDriver } from '../../../redux/action/getDriver';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";


const { Column, HeaderCell, Cell } = Table;

export const List = ({data}) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [driverData, setData] = useState(null);
  const dispatch = useDispatch();

const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const hadnleDelete = (id) => {
    dispatch(deleteDriver(id));
    setDelOpen(false);
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
      <div className='flex justify-between items-center'>
        <h5 className='table-title'>Водители</h5>
        <Button onClick={() => {
          setData(null);
          handleOpen();
        }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
          Добавить
        </Button>
      </div>
      <div>
      <Table
        height={100+(data.length * 40)}
        className='mt-[20px]'
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        minwidth={500}
        style={{ width: '100%', maxHeight: '450px' }}
    >
      <Column width={70} align="center" fixed sortable>
        <HeaderCell>Id</HeaderCell>
        <Cell dataKey="id" />
      </Column>

      <Column flexGrow={1} fixed sortable>
        <HeaderCell>ФИО</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column flexGrow={1}  sortable>
        <HeaderCell>Номер машины</HeaderCell>
        <Cell dataKey="carNumber" />
      </Column>

      <Column flexGrow={1} sortable>
        <HeaderCell>Контакт</HeaderCell>
        <Cell dataKey="contact" />
      </Column>

      <Column flexGrow={1} sortable>
        <HeaderCell>Электронная почта</HeaderCell>
        <Cell dataKey="mail" />
      </Column>
      <Column fixed="right" width={100}>
        <HeaderCell className='text-center'>Действия</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
              <div className='flex justify-between items-center'>
                <Button className='withoutButton' appearance="default" onClick={() => {
                setData(rowData);
                handleOpen();
              } }>
                <MdEdit color='#1caf68' size={20} />
              </Button>
              <Button className='withoutButton' appearance="default" onClick={() => {
                setData(rowData);
                setDelOpen(true);
              } }>
                  <MdDeleteOutline color='rgb(210 54 54)' size={20} />
                </Button>
              </div>
          )}
        </Cell>
      </Column>
        </Table>
        </div>
      {
        open && <AddEdit handleClose={handleClose} open={open} data={driverData} />
      }
      {
        delOpen && <DelPopup handleDelete={()=>hadnleDelete(driverData.id)} handleClose={()=>setDelOpen(false)} open={delOpen} text={`Водителя ${driverData.name}`} />
      }
      </>
  );
};
