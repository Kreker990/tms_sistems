import { Button, Table } from 'rsuite';
import { useState } from 'react';
import AddEdit from '../edit';
import { useDispatch, useSelector } from 'react-redux';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";
import { deleteCompanyA } from '../../../redux/action/companiesA';


const { Column, HeaderCell, Cell } = Table;

export const List = ({ data }) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [comAData, setData] = useState(null);
  const dispatch = useDispatch();
  const authorized = useSelector(s => s.authorized);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const hadnleDelete = (id) => {
    dispatch(deleteCompanyA(id));
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
        <h5 className='table-title'>Точки отправки и получения</h5>
        <Button onClick={() => {
          setData(null);
          handleOpen();
        }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
          Добавить
        </Button>
      </div>
      <div>
        <Table
          height={100 + (data?.length * 40)}
          className='mt-[20px]'
          data={getData()}
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          loading={loading}
          minwidth={500}
          style={{ width: '100%', maxHeight: '450px' }}
          locale={{
            emptyMessage: 'Данные не найдены',
          }}
        >
          <Column width={70} align="center" fixed sortable>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column flexGrow={1} fixed sortable>
            <HeaderCell>Название</HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Электронная почта</HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Тип</HeaderCell>
            <Cell dataKey="type" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Адрес</HeaderCell>
            <Cell dataKey="address" />
          </Column>
          <Column fixed="right" width={100}>
            <HeaderCell className='text-center'>Действия</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex justify-between items-center'>
                  <Button className='withoutButton' appearance="default" onClick={() => {
                    setData(rowData);
                    handleOpen();
                  }}>
                    <MdEdit color='#1caf68' size={20} />
                  </Button>
                  <Button className='withoutButton' appearance="default" onClick={() => {
                    setData(rowData);
                    setDelOpen(true);
                  }}>
                    <MdDeleteOutline color='rgb(210 54 54)' size={20} />
                  </Button>
                </div>
              )}
            </Cell>
          </Column>
        </Table>
      </div>
      {
        open && <AddEdit handleClose={handleClose} open={open} data={comAData} />
      }
      {
        delOpen && <DelPopup handleDelete={() => hadnleDelete(comAData.id)} handleClose={() => setDelOpen(false)} open={delOpen} text={`точку отправки ${comAData.name}`} />
      }
    </>
  );
};
