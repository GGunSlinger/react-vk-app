import React, { useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';

const App = () => {

	const [activePanel] = useState('home');
	const [fetchedFriends, setFriends] = useState(null);
	const [popout, setPopout] = useState(null);

	async function fetchData() {
		setPopout(<ScreenSpinner size='large' />);
		let authToken
		try {
			authToken = await bridge.send("VKWebAppGetAuthToken", { "app_id": 7646648, "scope": "friends" })
		} catch (err) {
			console.error(err)
		}
		const params = {
			"order": "name",
			"count": "5000",
			"offset": "0",
			"fields": "city, domain, photo_200_orig, sex, bdate",
			"v": "5.124",
			"access_token": authToken.access_token,
		}
		let userFriends
		try {
			userFriends = await bridge.send("VKWebAppCallAPIMethod", { "method": "friends.get", "params": { ...params } });
		} catch (err) {
			console.error(err)
		}

		let totalFriends = userFriends.response.items

		const sleep = ms => {
			return new Promise(resolve => setTimeout(resolve, ms))
		}

		const addFriend = friend => {
			let filteredFriends = totalFriends.filter((thing, index, self) =>
				thing.deactivated !== "deleted" && thing.deactivated !== "banned" && index === self.findIndex((t) => (
					t.id === thing.id
				))
			)
			return sleep(200).then(() => {
				totalFriends = [...filteredFriends, ...friend]
			})
		}
		for (let i = 0; totalFriends.length < 10000; i++) {
			try {
				let friendsFromFriends = await bridge.send("VKWebAppCallAPIMethod",
					{ "method": "friends.get", "params": { ...params, "user_id": totalFriends[i].id } })
				await addFriend(friendsFromFriends.response.items)
			} catch (err) {
				console.error(err)
			}
		}
		setFriends(totalFriends.filter((e, index) => index < 10000))
		setPopout(null)
	}

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home
				id='home'
				popout={popout}
				allFriends={fetchedFriends}
				fetchData={fetchData} />
		</View>
	);
}

export default App;

