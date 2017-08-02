import Vue from 'vue'

Vue.component('my-header', {
    template: '<p>this is my header</p>'
});

new Vue({
    el: '#app',
    template: '<p>{{word}}</p>',
    data: {
        word: 'hello world shanchao'
    }
});