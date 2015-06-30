angular.module('statsApp', [])
    .controller('StatsController', ['$scope', '$interval', function($scope, $interval) {

        var recalc = function() {

            $scope.stats.str = bound($scope.stats.str);
            $scope.stats.dex = bound($scope.stats.dex);
            $scope.stats.con = bound($scope.stats.con);
            $scope.stats.int = bound($scope.stats.int);
            $scope.stats.wis = bound($scope.stats.wis);
            $scope.stats.cha = bound($scope.stats.cha);

            $scope.points = 27;

            $scope.points -= cost($scope.stats.str);
            $scope.points -= cost($scope.stats.dex);
            $scope.points -= cost($scope.stats.con);
            $scope.points -= cost($scope.stats.int);
            $scope.points -= cost($scope.stats.wis);
            $scope.points -= cost($scope.stats.cha);
        };

        var bound = function(value) {
            if (value < 8) {
                return 8;
            }
            if (value > 15) {
                return 15;
            }
            return value;
        };

        var cost = function(value) {

            if (value > 7 && value < 14) {
                return value - 8;
            }
            if (value == 14) {
                return 7;
            }
            if (value == 15) {
                return 9;
            }

            throw new Error("Invalid statistic value: " + value);
        };

        $scope.reset = function() {
            $scope.stats = {
                str : 8,
                dex : 8,
                con : 8,
                int : 8,
                wis : 8,
                cha : 8
            };
            $scope.points = 27;
        };

        $scope.inc = function(stat) {
            if (typeof $scope.stats[stat] !== "undefined") {
                $scope.stats[stat]++;
                recalc();
            }
        };

        $scope.dec = function(stat) {
            if (typeof $scope.stats[stat] !== "undefined") {
                $scope.stats[stat]--;
                recalc();
            }
        };

        $scope.reset();
    }]);
