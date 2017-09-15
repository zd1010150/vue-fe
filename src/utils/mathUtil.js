export default{
	getPercentage (dividend,divisor) {
		if(typeof divisor == 'number' && typeof dividend == 'number' && divisor != NaN && dividend != NaN){
			if(divisor == 0){
				return 0
			}else return dividend/divisor
		}else return 0
	}
}