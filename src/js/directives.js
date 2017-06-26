angular.module('dirs', [])
.controller('scopeCtrl', scopeCtrl)
.directive('elemDirective', elemDirective)
.directive('attrDirective', attrDirective)
.directive('classDirective', classDirective)
.directive('commentDirective', commentDirective)
.directive('counter', counter)
.directive('counter2', counter2)
.directive('oneWayDir', oneWayDir)
.directive('twoWayDir', twoWayDir)
.directive('parentContextDir', parentContextDir);


function elemDirective() {
	return {
		/* The RESTRICT option determines the type of directive, which can be:
			*   'A'  for Attribute. Best for adding functionality to existing elements.
			*   'E' for Element. Best for custom elements.
			*   'C' for Class. Best for existing HTML that needs additional functionality.
			*   'M' for comment (not recommended)
		*/
		restrict: 'E',
		// You can use the TEMPLATE option when your HTML snippet is simple
		template: '<p>Yo soy un elemento.</p>',
	}
}

function attrDirective() {
	return {
		restrict: 'A',
		// templateUrl is more effective when dealing with complex HTML. In this case, we have created the template as a script snippet on the HTML, and are referencing it by its "id" value
		templateUrl: 'attr-directive.html'
	}
}

function classDirective() {
	return {
		restrict: 'C',
		// The third way to use a template is to simply create an HTML file, and reference it in the templateUrl option with the path to the file. This is the preferred way of using directive templates for reusable components
		templateUrl: 'assets/templates/class-directive.template.html'
	}
}

function commentDirective() {
	return {
		restrict: 'M',
		// The replace option, while deprecated, must be used for Comment directives to work correctly.
		replace: true,
		template: '<p>Yo soy un comentario.</p>',
	}
}

// Here we are creating a custom control with added functionality via the link function
function counter() {
	return {
		restrict: 'E',
		template: '<button type="button" style="display: inline-block; margin-right: .5em">-</button><span>{{ counter }}</span><button type="button" style="display: inline-block; margin-left: .5em">+</button>',
		link: function(scope, elem, attrs) {
			/* The link function is executed when the HTML element is loaded in the DOM. Think of it as a "document ready" callback
				The function link receives three parameters by default:
				* scope: The inherited scope to work in.
				* eleme: The HTML element, wrapped as an Angular element, where the directive is applied.
				* attrs: The attributes of the HTML element, as an array.
			*/

			// Assign the attribute and convert to number. If there's no attribute, default to 1.
			var increment = parseInt(attrs.increment || 1);

			// In the link function you can initialize values for your custom control.
			scope.counter = 0;

			// We know that our custom control has two buttons, so let's get them in order to add our custom functionality.
			var buttons = elem.find('button');
			var buttonSubtract = buttons[0];
			var buttonAdd = buttons[1];

			// Angular uses a simplified jQuery library called jQLite. Check the Angular Element documentation to see which functions are available.
			// https://docs.angularjs.org/api/ng/function/angular.element
			angular.element(buttonSubtract).on('click', function() {
				// Since Angular needs a way to know which DOM changes trigger model changes and viceversa, we must wrap our logic into Angulars $apply method.
				// EXERCISE: Try removing this $apply wrapper to your control's logic and see what happens.
				scope.$apply(function() {
					scope.counter = scope.counter - (increment);
					console.log(scope.counter);
				});
			});

			angular.element(buttonAdd).on('click', function() {
				scope.$apply(function() {
					scope.counter = scope.counter + parseInt(increment);
					console.log(scope.counter);
				});
			});
		}
	}
}

/******** ADDITIONS FOR SESSION 5 ********/

// This is the same directive as counter, but all functionality comes from controller instead of the link functions, just as an example
// Adding template and controller inline for clarity. Remember best practics
function counter2() {
	return {
		restrict: 'E',
		template: '<button type="button" style="display: inline-block; margin-right: .5em" ng-click="subtract()">-</button><span>{{ counter }}</span><button type="button" style="display: inline-block; margin-left: .5em" ng-click="add()">+</button>',
		/*
			* The controller has three dependencies by default, which are the scope, the element of the directive, and the attributes of the element
			* Unlike the link function parameters, if you change the name of these dependencies the control will most likely break, so use them as defined here
		*/
		controller: ['$scope', '$element', '$attrs', function counter2Controller ($scope, $element, $attrs) {
			var increment = parseInt($attrs.increment || 1);

			$scope.counter = 0;

			$scope.subtract = function() {
					$scope.counter = $scope.counter - (increment);
					console.log($scope.counter);
			}

			$scope.add = function() {
				$scope.counter = $scope.counter + parseInt(increment);
				console.log($scope.counter);
			}
		}],
		scope: {}
	}
}

// Demo controller with default values and methods
function scopeCtrl($scope) {
	var vm = $scope;

	vm.default = 'Default value';

	vm.reset = function () {
		vm.default = 'OUTER CHANGE';
	}
}
scopeCtrl.$inject = ['$scope'];

function oneWayDir() {
	return {
		restrict: 'E',
		template: '<p>Inner Default: {{ default }}</p><label for="owbi">Input in Directive</label><input id="owbi" type="text" ng-model="innerValue">',
		scope: {
			// '@': The value gets passed as string, and does not affect changes upward
			innerValue: '@'
		},
		link: function myDirLink (scope, elem, attrs) {
			scope.default = 'Value from Directive';
		}
	}
}

function twoWayDir() {
	return {
		restrict: 'E',
		template: '<p>Inner Default: {{ default }}</p><label for="twbi">Input in Directive</label><input id="owbi" type="text" ng-model="myValue">',
		scope: {
			// '=': A normal two-way binding. Notice that you can assign an internal name for handling the value. Here, the innerVvalue from the HTML is passed and used as "myValue"
			myValue: '=innerValue'
		},
		link: function myDirLink (scope, elem, attrs) {
			scope.default = 'Value from Directive';
		}
	}
}

function parentContextDir() {
	return {
		restrict: 'E',
		template: '<p>Inner Default: {{ default }}</p><button type="button" ng-click="myValue()">Parent Context</button><p><button type="button" ng-click="reset()">Scope Context</button>',
		scope: {
			// '&': The methods referenced are executed in the context of the parent/outer scope. Even if we have a method with the same name in the directive, Anuglar will know which one to reference. This is the best pattern for making and working with controller APIs
			myValue: '&innerValue'
		},
		link: function myDirLink (scope, elem, attrs) {
			scope.default = 'Value from Directive';
			scope.reset = function() {
				scope.default = 'INNER CHANGE ONLY';
			}
			console.log('listo');
		}
	}
}