import axios from 'axios';
export default {
	restfullCall: function (url, body, method, dataFormat) {
		axios({
				method: method,
				url: url,
				data: body
			}).then(res => {
				dataFormat(res);
			})
			.catch(error => {
				console.log(error);
			});
	}
}