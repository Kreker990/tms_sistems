// components/orders/List.js
import React, { useState, useEffect } from 'react';
import { Button, Table, SelectPicker } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import AddEditOrder from '../edit/index';
import DelPopup from '../../../components/DelPopup';
import { MdDeleteOutline, MdEdit, MdOutlineAdd } from "react-icons/md";
import { getOrders, deleteOrder } from '../../../redux/action/order';
import styles from './index.module.css';
import { dateRanges, filterOrdersByDate } from '../../../components/DateR';

const { Column, HeaderCell, Cell } = Table;

export const List = () => {
  const [sortColumn, setSortColumn] = useState();
  const [dateRange, setDateRange] = useState('allTime');
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const authorized = useSelector(state => state.authorized);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
    setDelOpen(false);
  };

  const getData = () => {
    let filteredOrders = filterOrdersByDate(orders, dateRange);

    if (sortColumn && sortType) {
      return filteredOrders.sort((a, b) => {
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
    return filteredOrders;
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
        <h5 className='table-title'>Заказы</h5>
        <div>

          <SelectPicker
            data={dateRanges}
            value={dateRange}
            onChange={setDateRange}
            placeholder="Выберите временной диапазон"
            style={{ width: 224, marginRight: '16px' }}
          />
          <Button onClick={() => {
            setOrderData(null);
            handleOpen();
          }} className='createButton' appearance="primary" endIcon={<MdOutlineAdd color='#fff' size={20} />}>
            Добавить
          </Button>
        </div>
      </div>
      <div>
        <Table
          height={100 + (orders?.length * 40)}
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

          <Column flexGrow={1} fixed >
            <HeaderCell>Точка отправки</HeaderCell>
            <Cell dataKey="a.name" />
          </Column>

          <Column flexGrow={1} >
            <HeaderCell>Точка получения</HeaderCell>
            <Cell dataKey="b.name" />
          </Column>

          <Column flexGrow={1} >
            <HeaderCell>Водитель</HeaderCell>
            <Cell dataKey="driver.name" />
          </Column>

          <Column flexGrow={1} >
            <HeaderCell>Статус</HeaderCell>
            <Cell dataKey="statusorder.value" />
          </Column>

          <Column flexGrow={1} >
            <HeaderCell>Менеджер</HeaderCell>
            <Cell dataKey="staff.name" />
          </Column>

          <Column flexGrow={1} >
            <HeaderCell>Комментарий</HeaderCell>
            <Cell dataKey="comment" />
          </Column>
          <Column flexGrow={1} >
            <HeaderCell>Цена</HeaderCell>
            <Cell dataKey="price" />
          </Column>
          <Column flexGrow={1} >
            <HeaderCell>время</HeaderCell>
            <Cell>
              {rowData => (
                <div className={styles.scrollable_cell}>
                  <div>{rowData.timeStart} \ {rowData.timeEnd}</div>
                </div>
              )}
            </Cell>
          </Column>
          <Column fixed="right" width={100}>
            <HeaderCell className='text-center'>Действия</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {rowData => (
                <div className='flex justify-center items-center'>
                  <Button className='withoutButton' appearance="default" onClick={() => {
                    setOrderData(rowData);
                    handleOpen();
                  }}>
                    <MdEdit color='#1caf68' size={20} />
                  </Button><Button className='withoutButton' appearance="default" onClick={() => {
                    setOrderData(rowData);
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
      {open && <AddEditOrder handleClose={handleClose} open={open} data={orderData} />}
      {delOpen && <DelPopup handleDelete={() => handleDelete(orderData.id)} handleClose={() => setDelOpen(false)} open={delOpen} text={`Заказ ${orderData.id}`} />}
    </>
  );
};
