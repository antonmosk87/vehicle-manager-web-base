(function() {
    'use strict';

    angular
        .module('app.sales')
        .controller('SalesDetailController', SalesDetailController);

    SalesDetailController.$inject = ['vehiclesFactory', 'customersFactory', 'salesFactory', 'SweetAlert', '$stateParams'];

    /* @ngInject */
    function SalesDetailController(vehiclesFactory, customersFactory, salesFactory, SweetAlert, $stateParams) {
        var vm = this;

        activate();

        vm.save = save;



        function activate() {
          //http://localhost:3000/#/sales/detail/1
          // grab the sale that matches the id provided in the URL
          var saleId = $stateParams.id;

           customersFactory
             .getAll()
             .then(function(customer) {
               vm.customers = customer;
             });

             vehiclesFactory
               .getAll()
               .then(function(vehicle) {
                 vm.vehicles = vehicle;
               });

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
              .update(vm.sale.saleId, vm.sale)
              .then(function() {
                SweetAlert.swal("You just updated a sale!", "Nice!", "success");
              });
          } else {
            salesFactory
            .create(vm.sale)
            .then(function() {
              SweetAlert.swal("You just created a sale!", "Good Job!", "success");
            })
          }

        }
    }
})();
