import React from 'react';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

const User = ({ friends }) => {
    return (
        <Group title="User Data Fetched with VK Bridge" key={friends.id}>
            <Cell
                before={friends.photo_200_orig ? <Avatar src={friends.photo_200_orig} /> : null}
                description={friends.city && friends.city.title ? friends.city.title : ''}
            >
                {`${friends.first_name} ${friends.last_name}, `}
                {`${friends.sex === 1 ? 'женщина' : 'мужчина'}`}
                {`${friends.bdate && friends.bdate.length > 5
                    ? `, ${new Date().getFullYear() - new Date(friends.bdate.split('.').pop()).getFullYear()} лет`
                    : ''
                    }`}
            </Cell>
        </Group>
    )
}

export default User