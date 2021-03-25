import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';

import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import './styles.css';
import api from '../../services/api';


function TeacherForm(){

    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('') 
    const [ whatsapp, setWhatsapp ] = useState('') 
    const [ bio, setBio ] = useState('') 
    
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    const [ scheduleItems, setScheduleItems ] = useState([
        { week_day: 0, from:"", to:"" }
    ]);
    const history = useHistory();

    function addNewScheduleItem(){

        setScheduleItems([
            ...scheduleItems, { week_day: 0, from:"", to:"" }
        ])

    };

    function setScheduleItemsValue( position: number, field: string, value: string ){
        const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if ( index === position ) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem; 
        });

        setScheduleItems(updatedScheduleItem); 
    }

    function handleCreateClass(e:FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');

        }).catch(() => {
            alert('Erro ao cadastrar! ')
        });

    };

    return (

        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que voce quer dar aulas!"
                description="O primeiro passo é preencher este formulário de inscrição"
             />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name="name" 
                            label="Nome completo"
                            value={name}
                            onChange={(e)=>{ setName(e.target.value)}}
                        />
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e)=>{ setAvatar(e.target.value)}}
                        />
                        <Input 
                            name="whatsapp" 
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e)=>{ setWhatsapp(e.target.value)}}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia" 
                            value={bio}
                            onChange={(e)=>{ setBio(e.target.value)}}
                            />

                    </fieldset>
                    
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        
                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e)=>{ setSubject(e.target.value) }}
                            options={[
                                {value:"Artes", label:"Artes"},
                                {value:"Biologia", label:"Biologia"},
                                {value:"Educação Física", label:"Educação Física"},
                                {value:"Física", label:"Física"},
                                {value:"Geografia", label:"Geografia"},
                                {value:"História", label:"História"},
                                {value:"Matemática", label:"Matemática"},
                                {value:"Português", label:"Português"},
                                {value:"Química", label:"Química"},
                            ]}
                        />
                        <Input 
                            name="cost" 
                            label="Preço da sua aula por hora"
                            value={cost} 
                            onChange={(e)=>{ setCost(e.target.value)}}
                        />

                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + novo horário
                            </button>
                        </legend>
                        {scheduleItems.map( (scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemsValue( index, 'week_day', e.target.value )}
                                        options={[
                                            {value:"0", label:"Segunda-feira"},
                                            {value:"1", label:"Terça-feira"},
                                            {value:"2", label:"Quarta-feira"},
                                            {value:"3", label:"Quinta-feira"},
                                            {value:"4", label:"Sexta-feira"},
                                            {value:"5", label:"Sábado"},
                                            {value:"6", label:"Domingo"},
                                         
                                        ]}
                                    />
                                    <Input 
                                        name="from" 
                                        label="das" 
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemsValue( index, 'from', e.target.value )}
                                    />
                                    <Input 
                                        name="to" 
                                        label="até" 
                                        type="time" 
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemsValue( index, 'to', e.target.value )}
                                    />
                                </div>

                            )
                        })}
                        
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon } alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados.
                        </p>
                        <button type="submit">Salvar cadastro</button>

                    </footer>
                </form>
            </main>



        </div>

    )
}

export default TeacherForm;