import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { authorizedUpdate } from "../../redux/action/authorized";
import { Button, Modal } from "rsuite";

const Header = () => {
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false)
    const authorized = useSelector(s => s.authorized);
    const openModal = () => {
        setModalShow(true)
    }
    const closeModal = () => {
        setModalShow(false)
    }

    const logOut = () => {
        dispatch(authorizedUpdate(false, ''))
        localStorage.clear();
    }
    return (
        <div className="flex items-center justify-between px-[20px] py-[10px] bg-white h-[56px]">
            <div className="flex items-center gap-[30px]">
                <span className="text-[18px]">{authorized.role === 'admin'
                    ? "Админ" :
                    authorized.role === 'driver'
                        ? "Водитель" : "Диспетчер"}</span>
            </div>
            <div className="flex items-center gap-[8px]">
                <div className="flex items-center gap-[8px]">
                    <FaRegUser size={20} />
                    <span className="text-[18px]">{localStorage.getItem('mail')}</span>
                </div>
                <span>|</span>
                <MdOutlineLogout size={20} onClick={openModal} cursor={'pointer'} />
            </div>
            <Modal size="xs" open={modalShow} onClose={closeModal}>
                <Modal.Header>
                    <Modal.Title>Подтверждение выхода</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Вы уверены, что хотите выйти из аккаунта?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeModal} appearance="subtle">
                        Отмена
                    </Button>
                    <Button onClick={logOut} appearance="primary" color="red">
                        Выйти
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default Header;
