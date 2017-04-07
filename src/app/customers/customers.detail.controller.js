(function() {
    'use strict';

    angular
        .module('app.customers')
        .controller('CustomersDetailController', CustomersDetailController);

    CustomersDetailController.$inject = ['customersFactory', 'SweetAlert', '$stateParams'];

    /* @ngInject */
    function CustomersDetailController(customersFactory, SweetAlert, $stateParams) {
        var vm = this;

        vm.save = save;

        activate();

        function activate() {
          //http://localhost:3000/#/customers/detail/1
          // grab the customer that matches the id provided in the URL
          var customerId = $stateParams.id;

          customersFactory
            .getById(customerId)
            .then(function(customer) {
              vm.customer = customer;
            })
            .catch(function(error) {
              alert(error);
            });
        }

        function save() {
          customersFactory
            .update(vm.customer.customerId, vm.customer)
            .then(function() {
              SweetAlert.swal("Customer saved!", "Good shit!", "success");
            })
        }
    }
})();
