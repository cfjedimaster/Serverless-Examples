// https://forum.vuejs.org/t/how-to-format-date-for-display/3586/5
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(value).format('MM/DD/YYYY [at] h:mma');
  }
});

const app = new Vue({
	el:'#app',
	data() {
		return {
			activations:[],
			last:0,
			activation:null
		}
	},
	created() {
		console.log('Start up, mofo!');
		this.getActivations();
	},
	methods:{
		getActivations() {
			console.log('getActivations?ts='+this.last);
			fetch('/activations?ts='+this.last)
			.then(res => res.json())
			.then(res => {
				//this.activations = res.activations;
				console.log('num activations='+res.activations.length);
				this.activations.unshift.apply(this.activations, res.activations);
				this.last = res.ts;
				// now call again
				setTimeout(() => {
					this.getActivations();
				}, 2000);
			});

		},
		loadActivation(act) {
			console.log('load '+act.id);
			this.activation = null;
			fetch('/activation/'+act.id)
			.then(res => res.json())
			.then(res => {
				console.log(res);
				this.activation = res;
			});
		}
	}
});