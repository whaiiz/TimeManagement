import React from 'react';
import Modal from '../Modal'; 
import UpsertTaskModalHeader from './UpsertTaskModalHeader';
import UpsertTaskModalBody from './UpsertTaskModalBody';
import UpsertTaskModalFooter from './UpsertTaskModalFooter';

export default function UpsertTaskModal({isVisible, closeCallback}) {

    // let [currentTask, setCurrentTask] = useState({});

    // let create = () => {

    // }

    // let update = () => {

    // }


    return (
        <Modal isVisible={isVisible}
            Header={<UpsertTaskModalHeader/>}
            Body={<UpsertTaskModalBody/>}
            Footer={<UpsertTaskModalFooter 
                closeCallback={_ => closeCallback()}/>}
        />
    );
}
