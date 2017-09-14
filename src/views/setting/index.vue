<template>
    <div class="container-fluid">
       <setting-information></setting-information>
       <setting-subscribe></setting-subscribe>
    </div>
</template>
<script>
    import information from "./information"
    import subscribe from "./subscribe"
    export default{
        components :{ 
            "setting-information" : information,
            "setting-subscribe" : subscribe
        }
    }
</script>