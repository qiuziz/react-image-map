/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2019-05-23 13:59:27
 * @Last Modified by: qiuz
 * @Last Modified time: 2019-11-27 21:36:49
 */

const Storage = (type = 'local') => {
	function createCookie(name: string, value : string, days: number) {
		let date: Date, expires: string;

		if (days) {
			date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toUTCString();
		} else {
			expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name: string) {
		let nameEQ = name + "=",
				ca = document.cookie.split(';'),
				i: number, c: any;

		for (i=0; i < ca.length; i++) {
			c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1,c.length);
			}

			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length,c.length);
			}
		}
		return null;
	}

	function setData(data: any) {
		data = JSON.stringify(data);
		if (type === 'session') {
			window.name = data;
		} else {
			createCookie('localStorage', data, 365);
		}
	}

	function clearData() {
		if (type === 'session') {
			window.name = '';
		} else {
			createCookie('localStorage', '', 365);
		}
	}

	function getData() {
		const data = type === 'session' ? window.name : readCookie('localStorage');
		return data ? JSON.parse(data) : {};
	}


	// initialise if there's already data
	let data = getData();

	return {
		length: 0,
		clear: function () {
			data = {};
			this.length = 0;
			clearData();
		},
		getItem: function (key: string) {
			return data[key] === undefined ? null : data[key];
		},
		key: function (i: number) {
			// not perfect, but works
			let ctr = 0;
			for (let k in data) {
				if (ctr === i) return k;
				else ctr++;
			}
			return null;
		},
		removeItem: function (key: string) {
			delete data[key];
			this.length--;
			setData(data);
		},
		setItem: function (key: string, value: string) {
			data[key] = value + ''; // forces the value to a string
			this.length++;
			setData(data);
		}
	};
};

const isSetItemNotWork = () => {
	try {
		localStorage.setItem('setItemNotWork', 'true');
		localStorage.removeItem('setItemNotWork');
		return localStorage;
	} catch (error) {
		console.log(error);
		return Storage();
	}
}

const LocalStoragePolyfill = isSetItemNotWork();

class LocalStorageTools {
	getItem(key: string) {
		const value = LocalStoragePolyfill.getItem(key);
		return value !== 'undefined' ? JSON.parse(value) : undefined;
	}

	setItem(key: string, value: any) {
		LocalStoragePolyfill.setItem(key, JSON.stringify(value));
	}

	removeItem(key: string) {
		LocalStoragePolyfill.removeItem(key);
	}

	get length() {
		return LocalStoragePolyfill.length;
	}

	key(index: number) {
		return LocalStoragePolyfill.key(index);
	}

	clear() {
		LocalStoragePolyfill.clear();
	}
}

export const LocalStorage = new LocalStorageTools();
