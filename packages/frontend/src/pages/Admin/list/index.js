import React, { useState, useEffect } from 'react';
import { Button, Table } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAdd } from "react-icons/md";
import { getOrders } from '../../../redux/action/order';

const { Column, HeaderCell, Cell } = Table;

export const List = () => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);
  const authorized = useSelector(state => state.authorized);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const getData = () => {
    if (sortColumn && sortType) {
      return [...orders].sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string' && typeof y === 'string') {
          return sortType === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
        }
        return sortType === 'asc' ? x - y : y - x;
      });
    }
    return orders;
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
        <h5 className='table-title'>Новые заказы</h5>
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
          minWidth={500}
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
            <HeaderCell>Точка доставки A</HeaderCell>
            <Cell dataKey="a.name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Точка доставки B</HeaderCell>
            <Cell dataKey="b.name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Водитель</HeaderCell>
            <Cell dataKey="driver.name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Статус</HeaderCell>
            <Cell dataKey="statusorder.value" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Менеджер</HeaderCell>
            <Cell dataKey="staff.name" />
          </Column>

          <Column flexGrow={1} sortable>
            <HeaderCell>Комментарий</HeaderCell>
            <Cell dataKey="comment" />
          </Column>
          <Column flexGrow={1} sortable>
            <HeaderCell>Цена</HeaderCell>
            <Cell dataKey="price" />
          </Column>
        </Table>
      </div>
    </>
  );
};
