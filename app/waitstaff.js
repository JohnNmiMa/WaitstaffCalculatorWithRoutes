angular.module('ngWaitstaffApp', ['ngRoute'])

.constant('DEFAULT_TAX_RATE', 7.35)

.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : './home.html',
        controller : 'HomeCtrl'
    }).when('/newmeal', {
        templateUrl : './newmeal.html',
        controller : 'NewMealCtrl'
    });
})

.controller('waitstaffCtrl', function($scope) {
    $scope.resetCalc = function() {
        $scope.$broadcast('resetCtrl', true);
    }
})

.controller('HomeCtrl', function($scope) {
})

.controller('NewMealCtrl', function($scope, DEFAULT_TAX_RATE) {
    $scope.data = {};
    $scope.subtotal = $scope.tip = $scope.total = null;
    $scope.init = function() {
        $scope.data.bmp = null;
        $scope.data.tipPcnt = null;
        $scope.data.taxRate = DEFAULT_TAX_RATE;
        $scope.submitted = false;
        $scope.error = 'none';
        $('#bmp').focus();
    }

    $scope.submit = function() {
        if($scope.mealForm.$valid) {
            updateCharges($scope.data);
            $scope.resetForm();
        } else {
            if ($scope.mealForm.$error.required) {
                $scope.error = 'required';
                console.log('The Form is not completely filled in');
            } 
            if ($scope.mealForm.$error.number) {
                $scope.error = 'number';
                console.log('The Form must contain numbers');
            }
            $scope.submitted = true;
        }
    }

    $scope.resetForm = function() {
        $scope.init();
        $scope.mealForm.$setPristine();
    }

    function updateCharges(data) {
        $scope.subtotal = data['bmp'] + (data['bmp'] * data['taxRate']/100);
        $scope.tip = data['bmp'] * data['tipPcnt']/100;
        $scope.total = $scope.subtotal + $scope.tip;
    };

    $scope.$on('resetCtrl', function(event, data) {
        $scope.resetForm();
    });
    $scope.init();

});

