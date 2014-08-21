angular.module('ngWaitstaffApp', ['ngRoute', 'ngAnimate'])

.constant('DEFAULT_TAX_RATE', 7.35)

.value('earningsValue', [])

.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : './home.html',
        controller : 'HomeCtrl'
    }).when('/new-meal', {
        templateUrl : './newmeal.html',
        controller : 'NewMealCtrl'
    }).when('/earnings', {
        templateUrl : './earnings.html',
        controller : 'EarningsCtrl'
    })
    .otherwise({ redirectTo : '/' });
})

.controller('HomeCtrl', function($scope) {
})

.controller('NewMealCtrl', function($scope, earningsValue, DEFAULT_TAX_RATE) {
    $scope.doShake = false;
    $scope.data = {};
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
            updateEarnings($scope.data);
            $scope.resetForm(false);
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

    function updateEarnings(data) {
        earningsValue.push({'bmp':data.bmp, 'taxRate':data.taxRate, 'tipPcnt':data.tipPcnt});
    };

    $scope.calcSubtotal = function() {
        $scope.subtotal = $scope.data.bmp + ($scope.data.bmp * ($scope.data.taxRate/100));
        return $scope.subtotal;
    }
    $scope.calcTip = function() {
        $scope.tip = $scope.data.bmp * ($scope.data.tipPcnt/100);
        return $scope.tip;
    }
    $scope.calcTotal = function() {
        return $scope.subtotal + $scope.tip;
    }
    $scope.resetForm = function(isCancel) {
        if (isCancel == true) {
            $scope.doShake = !$scope.doShake;
        }
        $scope.init();
        $scope.mealForm.$setPristine();
    }
    $scope.init();
})

.controller('EarningsCtrl', function($scope, earningsValue) {
    $scope.doShake = false;
    $scope.tipTotal = $scope.mealCount = $scope.avgTPM = 0;
    for (meal in earningsValue) {
        $scope.tipTotal += earningsValue[meal].bmp * earningsValue[meal].tipPcnt/100;
        $scope.mealCount += 1;
        $scope.avgTPM = $scope.tipTotal / $scope.mealCount;
    }

    $scope.resetCalc = function() {
        $scope.doShake = !$scope.doShake;
        earningsValue.length = 0;
        $scope.tipTotal = $scope.mealCount = $scope.avgTPM = 0;
    }
});
