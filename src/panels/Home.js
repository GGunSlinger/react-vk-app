import React, { useState } from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Search from './Search';
import { FixedSizeList as List } from "react-window";
import { Avatar, Cell } from '@vkontakte/vkui';

const Home = ({ id, allFriends, fetchData, popout }) => {

	const [searching, setSearching] = useState(false);

	const reset = (flag) => {
		setSearching(flag)
	}

	const User = ({ index, key, style }) => (
		<div key={key} style={style}>
			<Group title="User Data Fetched with VK Bridge" key={key} style={{width: "100vw"}}>
				<Cell
					before={allFriends[index].photo_200_orig ? <Avatar src={allFriends[index].photo_200_orig} /> : null}
				>
					{`${allFriends[index].first_name} ${allFriends[index].last_name}, `}
					{`${allFriends[index].sex === 1 ? 'женщина' : 'мужчина'}`}
					{`${allFriends[index].bdate && allFriends[index].bdate.length > 5
						? `, ${new Date().getFullYear() - new Date(allFriends[index].bdate.split('.').pop()).getFullYear()} лет`
						: ''
						}`}
				</Cell>
			</Group>
		</div>
	)

	return (
		<Panel id={id}>
			<PanelHeader>{allFriends && !searching && `${allFriends.length} друзей и их друзей`} </PanelHeader>
			{allFriends !== null && !popout && <Search allFriends={allFriends} reset={reset} searching={searching} />}
			{!searching && allFriends && <List
				width={1400}
				height={505}
				itemCount={allFriends.length}
				itemSize={80}
			>
				{User}
			</List>}
			<Group title="Navigation Example">
				<Div>
					{!allFriends && !popout && <Button size="xl" level="2" onClick={fetchData} data-to="persik">
						Загрузить 10 000 друзей друзей
					</Button>}
				</Div>
			</Group>
		</Panel>
	)
};

export default Home;
