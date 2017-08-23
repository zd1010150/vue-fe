<template>
<div class="container-fluid">
	  <h2>dashboard</h2>
	   <p>{{ new Date(new Date().getTime()+8*60*60*1000)}}</p>
	    <p>{{ $d(new Date(), 'long') }}</p>
  		<p>{{ $d(new Date(), 'long', 'zh') }}</p>
  		<p>
  		{{ $d(new Date(1503450045341), 'long') }}<br>
  		{{ $d(new Date(1503450045341), 'long','zh') }}<br>
  		
  		format en:{{ $d(new Date(beijingTime), 'long') }}<br>
  		format zh:{{ $d(new Date(1503450045341), 'long','zh') }}<br>

  			delay:{{ delay}}<br>

  		</p>
  		<p>{{ new Date().getTimezoneOffset()}}</p>
</div>

</template>
<script>
import { getBeiJingTimeByTimestamp,getTimeDelay } from "src/utils/dateUtil"

  export default{
    name:"dashboard",
    data(){
    	return {
    		delay: getTimeDelay(1503450045341),
    		beijingTime: getBeiJingTimeByTimestamp(1503450045341)
    	}
    	
    }
  }
</script>
