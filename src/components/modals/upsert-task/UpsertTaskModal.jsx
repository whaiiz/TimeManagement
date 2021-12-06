import React from 'react';
import Modal from '../Modal'; 
import '../../../styles/upsert-task.css';
import UpsertTaskModalHeader from './UpsertTaskModalHeader';
import UpsertTaskModalBody from './UpsertTaskModalBody';
import UpsertTaskModalFooter from './UpsertTaskModalFooter';

export default function UpsertTaskModal({isVisible}) {
    return (
        <Modal isVisible={isVisible}
            Header={UpsertTaskModalHeader}
            Body={UpsertTaskModalBody}
            Footer={UpsertTaskModalFooter}
        />
    );
}
