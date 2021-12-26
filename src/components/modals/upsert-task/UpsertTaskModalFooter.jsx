import React from 'react'
import '../../../styles/modals/upsert-task/upsert-task-modal-footer.css'

export default function UpsertTaskModalFooter({closeCallback}) {
    return (
        <article>
            <button onClick={closeCallback}>Fechar</button>                
            <button>Criar</button>
        </article>
    )
}
