import { FormLayout, FormLayoutGroup, Radio } from '@vkontakte/vkui';
import React from 'react'
import './Main.css'

export default function Filter({ changeFilter, genderFilter, pickedFilter, gender }) {
    return (
        <FormLayout className="filter">
            <FormLayoutGroup top="Поиск по" onChange={e => changeFilter(e.target.value)}>
                <Radio name="type" value="first_name" defaultChecked={pickedFilter === "first_name"}>Имени</Radio>
                <Radio name="type" value="last_name"defaultChecked={pickedFilter === "last_name"} >Фамилии</Radio>
                <Radio name="type" value="bdate" defaultChecked={pickedFilter === "bdate"}>возрасту</Radio>
            </FormLayoutGroup>
            <FormLayoutGroup top="Выберете пол" onChange={e => genderFilter(e.target.value)}>
                <Radio name="sex" value="2" defaultChecked={gender === "2"}>Мужчина</Radio>
                <Radio name="sex" value="1" defaultChecked={gender === "1"}>Женщина</Radio>
                <Radio name="sex" value='' defaultChecked={gender === null}>любой</Radio>
            </FormLayoutGroup>
        </FormLayout>
    );
}