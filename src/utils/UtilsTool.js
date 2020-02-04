const UtilsTool = {
	scrollToTop() {
		const scrollOptions = {
			left: 0,
			top: 0,
			behavior: 'smooth'
		}

		return window.scrollTo(scrollOptions)
	},
	timeConvert(time) {
		if (!time) {
			return ''
		}

		// Remove last 3 characters of time string
		// time = time.substr(0, time.length-3)
		// Check correct time format and split into components
		time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
		
		if (time.length > 1) { // If time format correct
		time = time.slice(1);  // Remove full string match value
		time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
		time[0] = +time[0] % 12 || 12; // Adjust hours
		}
	
		return time.join(''); // return adjusted time or original string
	},
	dateFormat(date) {
		let parts = date.toString().split(" ");
		let months = {
		Jan: "01",
		Feb: "02",
		Mar: "03",
		Apr: "04",
		May: "05",
		Jun: "06",
		Jul: "07",
		Aug: "08",
		Sep: "09",
		Oct: "10",
		Nov: "11",
		Dec: "12"
		};
		let formattedDate = months[parts[1]]+"/"+parts[2]+"/"+parts[3];
		return formattedDate
	},
	getFileExtBase64(str) {
		return '.' + str.split(';')[0].substr(11);
	},
	today(date) {
		let today = new Date();
		if (date) today = date
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();
		
		today = mm + '/' + dd + '/' + yyyy;
		return today
	},
		





	strReverse(str) {
		let splitString = str.split("");
		let reverseArray = splitString.reverse();
		let joinArray = reverseArray.join("");

		return joinArray
	},
	verifyTeleNum(str)
	{
		let error=0;
		let tempstr;

		if (str.length === 10)
		{
			tempstr=str.substr(0,3)+"-"+str.substr(3,3)+"-"+str.substr(6,4);
			str=tempstr;
		}

		if (str.length !== 12)
			error= 1;
		else
		{
			str=str.substr(0,12);
			for (let i=0;i<3;i++)
				if (!(str.charAt(i)>='0' && str.charAt(i)<='9'))
					error=1;
			if (str.charAt(3)!==' ' && str.charAt(3)!=='-')
				error=1;
			for (let i=4;i<7;i++)
				if (!(str.charAt(i)>='0' && str.charAt(i)<='9'))
					error=1;
			if (str.charAt(7)!==' ' && str.charAt(7)!=='-')
				error=1;
			for (let i=8;i<12;i++)
				if (!(str.charAt(i)>='0' && str.charAt(i)<='9'))
					error=1;
		}
		if (error===1)
		{
			return 0;
		}
		else
		{
			return 1;
		}
	},
	truncateString(input, n) {
		if (input && input.length > n)
			return input.substring(0, n) + '...';
		else
			return input;
	},
	verifyEmail(email) {
		let mailRex = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/

		if (mailRex.test(email)) {
			return true
		}

		return false
	},
	strip(num) {
		return parseFloat(num.toPrecision(12));
	},
	titleCase(name) {
		// Capitalize the first letter of each word, other lowercase
		let reg = /\b(\w)|\s(\w)/g;
		name = name.toLowerCase();
		return name.replace(reg, (letter) => {return letter.toUpperCase()})
	},
	formatEnglishName(last, first, mid, type, modifier) {
		if(!last && !first) {
			return 'N/A'
		}
		
		let employeeType = type ? type.trim().toUpperCase() : ''

		let firstName = first ? this.titleCase(first.trim()) : ''
		let midName = mid ? mid.trim().toUpperCase()[0] : ''
		let lastName = last ? this.titleCase(last.trim()) : ''

		let doctorName = ''
		if (modifier===1) {
			//(first name first) Harry D. Smith, MD
			doctorName = firstName + (midName ? ' ' + midName + '.': '') + ' ' + lastName + (employeeType ? ', ' + employeeType : '')
		}
		else {
			//(default) Smith, Harry D.  MD
			doctorName = lastName + ', ' + firstName + (midName ? ' ' + midName + '.': '') + (employeeType ? '  ' + employeeType : '');
		}
		return doctorName
	},

	formatAddress(item) {
		let visitLocation = '';
        if (item.address) {
            visitLocation += this.titleCase(item.address)
        }
        if (item.city) {
            visitLocation += (', ' + this.titleCase(item.city))
        }
        if (item.state) {
            visitLocation += (', ' + item.state.trim().toUpperCase())
        }
        if (item.zip) {
            visitLocation += (' ' + item.zip)
        }
        return visitLocation
	},
	formatISODate(str) {
		//Input ISO Date string i.e. ('2019-07-09T16:57:29')
		let date
		str ? date = new Date(str) : date = new Date()

		let	year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();

		if (day < 10) {
			day = '0' + day;
		}
		if (month < 10) {
			month = '0' + month;
		}
		let newDate = month + '/' + day + '/' + year
		return newDate
	}
}

export default UtilsTool