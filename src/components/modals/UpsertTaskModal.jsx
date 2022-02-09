import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateTask, createTask } from '../../repositories/task-repository';
import { errorMessage, successMessage } from '../../services/sweet-alert-service';
import Modal from './Modal'; 
import '../../styles/modals/upsert-task-modal.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function UpsertTaskModal({isVisible, closeCallback, task}) {

    const schema = yup.object({
        name: yup.string().required("Name is mandatory").max(20, 'Name can\'t have more than 20 digits'),
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
    }, [task])

    let getModalTitle = () => {
        return task.id ?  "Update Task" : "Add Task";
    }

    let create = (data) => {
        createTask(data).then(_ => {
            successMessage("Success", "Task created!").then(_ => window.location.reload());
        })
        .catch(_ => {
            errorMessage("Error", "Error creating task! Please try again.");
        });
    }

    let update = (data) => {
        updateTask(data).then(_ => {
            successMessage("Success", "Task updated!").then(_ => window.location.reload());
        })
        .catch(_ => {
            errorMessage("Error", "Error updating task! Please try again.");
        });
    }

    let onSubmit = (data) => {
        if(data.id) update(data);
        else create(data);
    }

    return (
        <form className="upsert-task-form">
            <Modal isVisible={isVisible}
                Header={<h1>{getModalTitle()}</h1>}
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
                    <article>
                        <button type="button" onClick={closeCallback}>Close</button>                
                        <button onClick={handleSubmit(onSubmit)}>{task.id ? "Update" : "Create"}</button>
                    </article>
                }
            />
        </form>
    );
}