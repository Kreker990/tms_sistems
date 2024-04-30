import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import './App.css';
import AuthModal from './components/AuthModal/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import 'rsuite/dist/rsuite.min.css';


import { Container, Sidebar, Sidenav, Navbar, Nav } from 'rsuite';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';
import AdminIcon from '@rsuite/icons/Admin';
import BarChartIcon from '@rsuite/icons/BarChart';
import MemberIcon from '@rsuite/icons/Member';
import Staff from './pages/Staff/Staff';
import ComA from './pages/ComA/ComA';
import ComB from './pages/ComB/ComB';
import Drivers from './pages/Drivers/Drivers';
import StatusOrder from './pages/StatusOrder/StatusOrder';
import Oders from './pages/Orders/Oders';
import { getDriver } from './redux/action/getDriver';

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: 'gray',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const authorized = useSelector(s => s.authorized.value);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const location = useLocation();
  const [expand, setExpand] = React.useState(true);

  const navigate = useNavigate();
  function handleActive(url) {
    navigate(url);
  }
  useEffect(()=>{
    dispatch(getDriver());
  })
  return (
    <div className="show-fake-browser sidebar-page">
      <Container>
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div style={headerStyles}>
              <span style={{ marginLeft: 12 }}></span>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} appearance="subtle">
            <Sidenav.Body>
              <Nav activeKey={location.pathname} onSelect={handleActive}>
                <Nav.Item eventKey="/" icon={<BarChartIcon />}>
                  Главная
                </Nav.Item>
                <Nav.Item eventKey="/drivers" icon={<MemberIcon />}>
                  Водители
                </Nav.Item>
                <Nav.Item eventKey="/staff" icon={<AdminIcon />}>
                  Персонал
                </Nav.Item>
                <Nav.Item eventKey="/orders" >
                  Заказы
                </Nav.Item>
                <Nav.Item eventKey="/coma" >
                  Точки отправки
                </Nav.Item>
                <Nav.Item eventKey="/comb" >
                  Точки доставки
                </Nav.Item>
                <Nav.Item eventKey="/statosorder" >
                  Статус заказов
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
        </Sidebar>

        <Container>
          <div className='routes'>
            <Routes>
              <Route path="/" element={<Admin />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/coma" element={<ComA />} />
              <Route path="/comb" element={<ComB />} />
              <Route path="/statosorder" element={<StatusOrder />} />
              <Route path="/orders" element={<Oders />} />
            </Routes>
            {
              // !authorized && <AuthModal />
            }
            <div id="notification" className="notification">
              Сохранено успешно!
            </div>
            <button onClick={() => { }}>jkjk</button>
          </div>
        </Container>
      </Container>
    </div>
  );
}
