import Vue from 'vue'

Vue.directive('autobottom', {
    componentUpdated: function(el,binding){        
        if (binding.value) el.scrollTop=el.scrollHeight
    }
})

