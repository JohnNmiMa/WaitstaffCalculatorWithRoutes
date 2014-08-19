angular.module('ngWaitstaffApp', [])
.constant('DEFAULT_TAX_RATE', 7.35)

.controller('waitstaffCtrl', function($scope) {
    $scope.$on('updateChargesAndEarnings', function(event,data) {
        $scope.$broadcast('updateCtrl', data);
    });
    $scope.resetCalc = function() {
        $scope.$broadcast('resetCtrl', true);
    }
})

.controller('mealFormCtrl', function($scope, DEFAULT_TAX_RATE) {
    $scope.data = {};
    $scope.init = function() {
        $scope.data.bmp = $scope.data.tipPcnt = null;
        $scope.data.taxRate = DEFAULT_TAX_RATE;
        $scope.submitted = false;
        $scope.error = 'none';
        $('#bmp').focus();
    }
    $scope.submit = function() {
        if($scope.mealForm.$valid) {
            $scope.$emit('updateChargesAndEarnings', $scope.data);
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
    $scope.$on('resetCtrl', function(event, data) {
        $scope.resetForm();
    });
    $scope.init();
})

.controller('chargesCtrl', function($scope) {
    $scope.init = function() {
        $scope.subtotal = $scope.tip = $scope.total = null;
    }
    $scope.$on('updateCtrl', function(event, data) {
        $scope.subtotal = data['bmp'] + (data['bmp'] * data['taxRate']/100);
        $scope.tip = data['bmp'] * data['tipPcnt']/100;
        $scope.total = $scope.subtotal + $scope.tip;
    });
    $scope.$on('resetCtrl', function(event, data) {
        $scope.init()
    });
    $scope.init();
})

.controller('earningsCtrl', function($scope, $rootScope) {
    $scope.init = function() {
        $scope.tipTotal = $scope.avgTPM = null;
        $scope.mealCount = 0;
    }
    $scope.$on('updateCtrl', function(event, data) {
        $scope.tipTotal += data['bmp'] * data['tipPcnt']/100;
        $scope.mealCount += 1;
        $scope.avgTPM = $scope.tipTotal / $scope.mealCount;
    });
    $scope.$on('resetCtrl', function(event, data) {
        $scope.init();
    });
    $scope.init();
})
