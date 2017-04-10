(function() {
    'use strict';

    angular
        .module('app.vehicles')
        .controller('VehiclesDetailController', VehiclesDetailController);

    VehiclesDetailController.$inject = ['vehiclesFactory', 'SweetAlert', '$stateParams'];

    /* @ngInject */
    function VehiclesDetailController(vehiclesFactory, SweetAlert, $stateParams) {
        var vm = this;

        vm.save = save;

        activate();

        function activate() {
          //http://localhost:3000/#/vehicles/detail/1
          // grab the vehicle that matches the id provided in the URL
          var vehicleId = $stateParams.id;

          vehiclesFactory
            .getById(vehicleId)
            .then(function(vehicle) {
              vm.vehicle = vehicle;
            })
            .catch(function(error) {
              alert(error);
            });
        }

        function save() {
          vehiclesFactory
            .update(vm.vehicle.vehicleId, vm.vehicle)
            .then(function() {
              SweetAlert.swal("Vehicle saved!", "Good!", "success");
            })
        }
    }
})();
