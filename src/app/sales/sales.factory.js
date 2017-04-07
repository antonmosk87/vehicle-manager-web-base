(function() {
    'use strict';

    angular
        .module('app')
        .factory('salesFactory', salesFactory);

    salesFactory.$inject = ['$http', 'apiUrl'];

    /* @ngInject */
    function salesFactory($http, apiUrl) {
        var service = {
            getAll: getAll,
            getById: getById,
            update: update,
            create: create,
            remove: remove
        };

        return service;

        function getAll() {
            return $http
                .get(apiUrl + 'sales')
                .then(function(response) {
                    return response.data;
                });
        }

        function getById(id) {
            return $http
                .get(apiUrl + 'sales/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function update(id, sale) {
            return $http.put(apiUrl + 'sales/' + id, sale);
        }

        function create(sale) {
            return $http
                .post(apiUrl + 'sales', sale)
                .then(function(response) {
                    return response.data;
                });
        }

        function remove(id) {
            return $http
                .delete(apiUrl + 'sales/' + id)
                .then(function(response) {
                    return response.data;
                });
        }
    }
})();
