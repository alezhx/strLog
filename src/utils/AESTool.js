import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

const AESKey = {
	default: '123!MDLand->2020~',
};

const AESTool = {
	encrypt(text, key) {
		let encrypt_key = AESKey.default;
		if (key) { encrypt_key = key }
		return AES.encrypt(text, encrypt_key).toString()
	},
	decrypt(text, key, success, fail) {
		let encrypt_key = AESKey.default;
		if (key) { encrypt_key = key }

		new Promise ((resolve,reject) => {
			resolve(AES.decrypt(text, encrypt_key))
		}).then(bytes => bytes.toString(CryptoJS.enc.Utf8))
		.then(decoded => success && success(decoded))
		.catch(err => fail && fail(err))
	}
};

export default AESTool