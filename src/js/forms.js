// Create a new module 'forms', with 'ngMessages' injected
// IMPORTANT: Remember to load the file for the angular-messages directive 
angular.module('forms', ['ngMessages'])
.controller('formsCtrl', formsCtrl);

function formsCtrl ($scope) {
	var vm = this;

	vm.response = {
		users: [
			{
				first: 'Jorge',
				last: 'Perez'
			},
			{
				first: 'Carlos',
				last: 'Garcia'
			},
			{
				first: 'Cesar',
				last: 'Olivas'
			}
		]
	};

	vm.isShowError = false;

	vm.toggleErrorDebug = function() {
		vm.isShowError = !vm.isShowError;
	}
};
formsCtrl.$inject = ['$scope'];