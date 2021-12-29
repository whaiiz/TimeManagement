import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateTask, createTask } from '../../services/task-service';
import Modal from './Modal'; 
import '../../styles/modals/upsert-task-modal.css'

export default function UpsertTaskModal({isVisible, closeCallback, task}) {
    let {register, handleSubmit, setValue } = useForm({
        defaultValues: {
            id: '',
            name: '',
            description: '',
            dateTime: '',
            status: ''
        }
    });

    useEffect(() => {
        let d = new Date(task.dateTime);
        let dateString = d.getFullYear().toString() + '-' + 
             (d.getMonth() + 1).toString().padStart(2, '0') + '-' + 
             d.getDate().toString().padStart(2, '0');

        setValue("id", task.id);
        setValue("name", task.name);
        setValue("description", task.description);
        setValue("status", task.status);
        setValue("dateTime", dateString)
    }, [task])

    let getModalTitle = () => {
        return task.id ?  "Atualizar tarefa" : "Adicionar tarefa";
    }

    let create = (data) => {
        createTask(data).then(r => console.log(r));
    }

    let update = (data) => {
        updateTask(data).then(r => console.log(r));
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
                                <input type="text" className="task-name" name="name" {...register("name")}/>
                            </article>
                            <article className="task-date-container">
                                <label htmlFor="task-date">Date</label>
                                <input type="date" className="task-date" name="dateTime" {...register("dateTime")}/>
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
                        <button type="button" onClick={closeCallback}>Fechar</button>                
                        <button onClick={handleSubmit(onSubmit)}>{task.id ? "Atualizar" : "Criar"}</button>
                    </article>
                }
            />
        </form>
    );
}
