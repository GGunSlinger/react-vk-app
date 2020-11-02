import { FormLayout, FormLayoutGroup, Radio } from '@vkontakte/vkui';
import React from 'react'
import './Main.css'

export default function Filter({ changeFilter, genderFilter }) {
    return (
        <FormLayout className="filter">
            <FormLayoutGroup top="Поиск по" onChange={e => changeFilter(e.target.value)}>
                <Radio name="type" value="first_name" defaultChecked>Имени</Radio>
                <Radio name="type" value="last_name">Фамилии</Radio>
                <Radio name="type" value="bdate" >возрасту</Radio>
            </FormLayoutGroup>
            <FormLayoutGroup top="Выберете пол" onChange={e => genderFilter(e.target.value)}>
                <Radio name="sex" value="2" >Мужчина</Radio>
                <Radio name="sex" value="1" >Женщина</Radio>
                <Radio name="sex" value='' defaultChecked>любой</Radio>
            </FormLayoutGroup>
        </FormLayout>
    );
}