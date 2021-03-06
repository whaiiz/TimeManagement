import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateTask } from '../../business-layer/tasks/update-task';
import { createTask } from '../../business-layer/tasks/create-task';
import { errorMessage, successMessage } from '../../utils/sweet-alert';
import Modal from './Modal'; 
import '../../styles/components/modals/upsert-task-modal.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function UpsertTaskModal({isVisible, closeCallback, task}) {
    const schema = yup.object({
        name: yup.string()
            .required("Name is mandatory")
            .max(20, 'Name can\'t have more than 20 digits'),
        dateTime: yup.date().required("Date is mandatory")
    }).required();

    let { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        defaultValues: {
            id: '',
            name: '',
            description: '',
            dateTime: Date.now(),
            status: 'ToDo'
        },
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        let d = new Date(task.dateTime);
        let dateString = d.getFullYear().toString() + '-' + 
             (d.getMonth() + 1).toString().padStart(2, '0') + '-' + 
             d.getDate().toString().padStart(2, '0');

        reset();
        setValue("id", task.id);
        setValue("name", task.name);
        setValue("description", task.description);
        setValue("status", task.status);
        setValue("dateTime", dateString)
    }, [task, reset, setValue])

    let getModalTitle = () => {
        return task.id ?  "Update Task" : "Add Task";
    }

    let create = async data => {
        let response = await createTask(data);

        if (response.userNotLoggedIn) window.location.href = '/Login';

        if (response.success) successMessage("Success", "Task created!").then(_ => window.location.reload());
        else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
    }

    let update = async data => {
        let response = await updateTask(data);

        if (response.userNotLoggedIn) window.location.href = '/Login';

        if (response.success) successMessage("Success", "Task updated!").then(_ => window.location.reload());
        else errorMessage("Error", "Something went wrong").then(_ => window.location.href = '/Login');
    }

    let onSubmit = async data => {
        if (data.id) await update(data);
        else await create(data);
    }

    return (
        <form className="upsert-task-form">
            <Modal isVisible={isVisible}
                Header={
                    <React.Fragment>
                        <h1 className='modal-title'>{getModalTitle()}</h1>
                        <span className='close-upsert-task' onClick={closeCallback}>&times;</span>
                    </React.Fragment>
                }
                Body={
                    <React.Fragment>
                        <input type="text" name="id" {...register("id")} hidden/>
                        <div>
                            <article className="task-name-container">
                                <label htmlFor="task-name">Name</label>
                                <input type="text" name="name" {...register("name")}
                                    className={errors.name?.message ? "invalid-input" : ""}
                                />
                                <label className="error-text">{errors.name?.message}</label>
                            </article>
                            <article className="task-date-container">
                                <label htmlFor="task-date">Date</label>
                                <input type="date" name="dateTime" {...register("dateTime")}
                                    className={errors.dateTime?.message ? "invalid-input" : ""}
                                />
                                <label className="error-text">{errors.dateTime?.message}</label>
                            </article>
                            <article className="task-status-container">
                                <label htmlFor="task-status">Status</label>
                                <select name="status" {...register("status")}>
                                    <option value="ToDo">ToDo</option>
                                    <option value="Active">Active</option>
                                    <option value="Done">Done</option>
                                </select>
                            </article>
                        </div>
                        <article className="task-description-container">
                            <label htmlFor="task-description">Description</label>
                            <textarea className="task-description" name="description" 
                                {...register("description")} cols="30" rows="5"></textarea>
                        </article>
                    </React.Fragment>
                }
                Footer={
                    <button className='upsert-button'onClick={handleSubmit(onSubmit)}>
                        {task.id ? "Update" : "Create"}</button>
                }
            />
        </form>
    );
}