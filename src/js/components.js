angular.module('app.components', [])
.directive('xdTabs',xdTabs)
.directive('xdTab',xdTab)
;

// This will be our main container. That is, the "parent" directive
function xdTabs() {
	return {
		restrict: 'E',
		scope: {},
		controller: ['$scope', function($scope) {
			// This is just a test model to check that our bindings work later
			$scope.myModel = 'Hola world!';

			// Here we will store all the panels. Since we don't know how many the user will add in the front or back end, we will need a method to register the panels inside the directive
			var panels = $scope.panels = [];

			/*
				The method to register panels. Notice that we add it to "this" instead of adding it to the $scope.
				Basically, what we do is that we add to $scope the things that we'd like to use in our view-model, or templates,
				and the methods we add to "this" will be handled on the controller's object/instance.
				It's a quirky concept to wrap your mind around, but with practice and basic understanding of JavaScript you'll see just how it works.
				For now, consider it a way to create a controller API so other directives can use it.
			*/
			this.addPanel = function(panel) {
				// If this is the first panel, select it by default
				if (panels.length === 0) {
					$scope.select(panel);
				}
				panels.push(panel);
			}

			// Method (used in the view, to change the state of the selected panel)
			$scope.select = function(panel) {
				angular.forEach(panels, function(panel) {
					panel.selected = false;
				})
				panel.selected = true;
			}
		}],
		templateUrl: '/assets/templates/xd-tabs.template.html',
		transclude: true
	}

}

// This is the directive for the tabs, or the "child" directives
function xdTab() {
	return {
		restrict: 'E',
		scope: {
			title: '@',
			myModel: '=ngModel'
		},
		/*
			The require option allows us to request controllers necessary for the functionality of our directive.
			If a controller has not been aliased with controllerAs, you request it by the name of the directive.
			If a single controller is required, you pass it as a string value, otherwise, you pass multiple controllers as an array.
			Symbol prefixes allow us to specify where the desired controller is to be searched:
				* No symbol: search only in the same element (for example, for attribute directives)
				* '^': Search in the same element. If not found, search in the parent.
				* '^^': Search exclusively in parent elements.
				* '?': The controller is optional. Can be used with the other symbols.
		*/
		// require: '^^xdTabs',		// Example for single-controller require.
		require: ['^^xdTabs', '?ngModel'],
		templateUrl: '/assets/templates/xd-tab.template.html',
		// When using the ngTransclude directive, we must use the transclude option.
		transclude: true,
		// When using require, the requested controller or controllers are found in a fourth parameter, as a single object or array of objects.
		link: function(scope, elem, attrs, controllers) {

			// Since we requested two controllers, we must get them from the array.
			// The controllers are found in the same order they are requested in the require option.
			var tabsController = controllers[0],
				ngModelController = controllers[1];

			// We can now use the exposed methods (or APIs) of the required controllers.
			// Here, we are adding the panel's scope to the parent directive with the exposed addPanel method.
			tabsController.addPanel(scope);

			// If you need a controller to add additional functions here, you would normally do the next check:
			// if (!ngModelController) {
			// 	return;
			// }
			// You're esentially saying that, if the controller was not found, then exit from the link function
		}
	}
}

/******** COMPONENTS ********/
/* Components are basically directives that are restricted to elements and have an isolate scope by default.
	The declaration is a bit different (we pass along an object instead of a function returning the declaration object), as are some of its options, but they are very similar in structure.
	One advantage to components is that they have defined lifecycle hooks, which we can leverage to add our functionality and have more control of our models.

	More info: https://docs.angularjs.org/guide/component
*/
angular.module('app.components')
.component('cpTab', {
	// Instead of scope, we use the binding option, which is more semantically clear
	bindings: {
		/* We still use the same symbols for binding, but there is a new one: the '<' prefix creates an effective one-way binding.
			Remember that the '@' symbol gives us a binding in the form of a string variable, not the dynamic model.
			The '=' symbol can still be used for two-way binding, but the paradigm of components suggest the use of controller and component APIs instead.
			This change of paradigm is beyond the scope of this workshop, but please check the component's documentation for details on how it works.
		*/
		title: '@',
		model: '<ngModel'
	},
	// The require option no longer accepts a string or an array, but a direct JS object. The symbols used are the same.
	require: {
		tabsController: '^^xdTabs',
		ngModel: '?ngModel'
	},
	templateUrl: '/assets/templates/cp-tab.template.html',
	transclude: true,
	// Since we now have an isolate scope by default, our methods to the viewModel must be added to the controller object, instead of the scope.
	// Hence, it is now easier and safer to just use "this" to refer to our controller.
	controller: function cpTabController() {

		// This is an example of a lifecycle hook. We are taking advantage of the $onInit hook to initalize our components models and state.
		// This is essentially the same as doing it on the link function of the directive (when the element was ready in the DOM).
		// For more information on lifecycle hooks please check the component's documentation.
		this.$onInit = function() {
			this.tabsController.addPanel(this);
		}

		if (this.ngModel) {
			console.log('Binding with ngModel exists:', this.ngModel);
		}
	}
})