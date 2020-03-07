<template>   
	<div class="paginate">
		<button v-on:click="prev"><</button>
		{{value}}/{{count}}
		<button v-on:click="next">></button>
    </div>
</template>

<script>
  export default {
    name: 'vpaginate',
    props: ['value', 'count'],

    methods: {
    	prev: function(){
    		console.log('prev');
    		this.$emit('input', Math.max(1, this.value-1));
    	},

    	next: function(){
    		console.log('next');
    		this.page = this.page+1;
    		this.$emit('input', Math.min(this.value+1, this.count));
    	}
    }
  }
</script>

<style>
	.paginate button{
		outline: none;
		background: none;
		border: none;
	}
	.paginate button:hover{
		text-decoration: underline;
		cursor: pointer;
	}
</style>