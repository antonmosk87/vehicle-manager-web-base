(function() {
    'use strict';

    angular
        .module('app.sales')
        .controller('SalesDetailController', SalesDetailController);

    SalesDetailController.$inject = ['salesFactory', 'SweetAlert', '$stateParams'];

    /* @ngInject */
    function SalesDetailController(salesFactory, SweetAlert, $stateParams) {
        var vm = this;

        vm.save = save;

        activate();

        function activate() {
          //http://localhost:3000/#/sales/detail/1
          // grab the sale that matches the id provided in the URL
          var saleId = $stateParams.id;

          // customersFactory
          //   .getAll()
          //   .then(function(customers) {
          //     vm.customers = customers;
          //   });

            // vehiclesFactory
            //   .getAll()
            //   .then(function(vehicles) {
            //     vm.vehicles = vehicles.data;
            //   });

          if(saleId) {
            salesFactory
              .getById(saleId)
              .then(function(sale) {
                vm.sale = sale;
              })
              .catch(function(error) {
                alert(error);
              });
            }
            else {
              vm.sale = {};
            }
        }

        function save() {
          var saleId = $stateParams.id;

          vm.sale.customerId = vm.selectedCustomer.customerId;
          vm.sale.vehicleId = vm.selectedVehicle.vehicleId;

          if(saleId) {
            salesFactory
              .update(vm.sale.saleId, vm.sale.sale)
              .then(function() {
                SweetAlert.swal("Customer saved!", "Nice!", "success");
              });
          } else {
            salesFactory
            .create(vm.sale.sale)
            .then(function() {
              SweetAlert.swal("Customer saved!", "Good Job!", "success");
            })
          }

        }
    }
})();
