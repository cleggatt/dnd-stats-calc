angular.module('statsApp', [])
    .controller('StatsController', ['$scope', '$interval', function($scope, $interval) {

        $scope.races = [
            {
                label: "Human",
                stats: {
                    str: 1,
                    dex: 1,
                    con: 1,
                    int: 1,
                    wis: 1,
                    cha: 1
                }
            },
            {
                label: "Human (Variant)",
                stats: {}
            },
            {
                label: "Elf (High)",
                stats: {
                    dex: 2,
                    int: 1
                }
            },
            {
                label: "Elf (Wood)",
                stats: {
                    dex: 2,
                    wis: 1
                }
            },
            {
                label: "Dwarf (Hill)",
                stats: {
                    con: 2,
                    wis: 1
                }
            },
            {
                label: "Dwarf (Mountain)",
                stats: {
                    con: 2,
                    str: 1
                }
            },
            {
                label: "Halfling (Stout)",
                stats: {
                    dex: 2,
                    con: 1
                }
            },
            {
                label: "Halfling (Lightfoot)",
                stats: {
                    dex: 2,
                    cha: 1
                }
            }
        ];

        var recalc = function () {

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

            $scope.modifiedStats = {
                str: $scope.stats.str,
                dex: $scope.stats.dex,
                con: $scope.stats.con,
                int: $scope.stats.int,
                wis: $scope.stats.wis,
                cha: $scope.stats.cha
            };

            for (var stat in $scope.selectedRace.stats) {
                if (typeof $scope.stats[stat] !== "undefined") {
                    $scope.modifiedStats[stat] += $scope.selectedRace.stats[stat];
                }
            }

            $scope.mods = {
                str: mod($scope.modifiedStats.str),
                dex: mod($scope.modifiedStats.dex),
                con: mod($scope.modifiedStats.con),
                int: mod($scope.modifiedStats.int),
                wis: mod($scope.modifiedStats.wis),
                cha: mod($scope.modifiedStats.cha)
            };
        };

        var bound = function (value) {
            if (value < 8) {
                return 8;
            }
            if (value > 15) {
                return 15;
            }
            return value;
        };

        var cost = function (value) {

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

        var mod = function (value) {

            if (value > 0 && value < 10) {
                return 0 - Math.ceil((10 - value) / 2);
            }

            if (value > 9 && value < 32) {
                return Math.floor((value - 10) / 2);
            }

            throw new Error("Invalid statistic value: " + value);
        };

        $scope.reset = function () {
            $scope.selectedRace = $scope.races[0];
            $scope.stats = {
                str: 8,
                dex: 8,
                con: 8,
                int: 8,
                wis: 8,
                cha: 8
            };
            $scope.modifiedStats = {
                str: 8,
                dex: 8,
                con: 8,
                int: 8,
                wis: 8,
                cha: 8
            };
            $scope.points = 27;
        };

        $scope.inc = function (stat) {
            if (typeof $scope.stats[stat] !== "undefined") {
                $scope.stats[stat]++;
                recalc();
            }
        };

        $scope.dec = function (stat) {
            if (typeof $scope.stats[stat] !== "undefined") {
                $scope.stats[stat]--;
                recalc();
            }
        };

        $scope.changeRace = function () {
            recalc();
        };

        $scope.reset();
        recalc();
    }]);

