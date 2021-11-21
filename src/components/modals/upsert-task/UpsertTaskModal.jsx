import React from 'react';
import Modal from '../Modal'; 
import '../../../styles/upsert-task.css';
import UpsertTaskModalHeader from './UpsertTaskModalHeader';
import UpsertTaskModalBody from './UpsertTaskModalBody';
import UpsertTaskModalFooter from './UpsertTaskModalFooter';

export default function UpsertTaskModal() {
    return (
        <Modal
            HeaderComponent={UpsertTaskModalHeader}
            BodyComponent={UpsertTaskModalBody}
            FooterComponent={UpsertTaskModalFooter}
        />
    );
}
