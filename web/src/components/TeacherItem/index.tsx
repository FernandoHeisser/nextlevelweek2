import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import api from '../../services/api';

import './styles.css';

export interface Teacher {
    id: number,
    user_id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}

interface TeacherItemProps {
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    
    async function handleCreateNewConnection() {
        await api.post('connections', {
            user_id: teacher.user_id
        });
    }
    
    return (
        <article className="teacher-item">
            <header>
                <img 
                    src={teacher.avatar} 
                    alt={teacher.name}
                />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(teacher.cost)}</strong>
                </p>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://wa.me/55${teacher.whatsapp}`}
                    onClick={handleCreateNewConnection}
                >
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}
export default TeacherItem;
