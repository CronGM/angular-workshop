angular.module('app')
.controller('modelsCtrl', function($scope) {
	var vm = this;

	vm.test = 'Hola mundi!';
})
.controller('extraCtrl', function($scope) {
	var vm = this;

	vm.test = 'Extra extra!';
});