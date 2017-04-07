(function() {
    'use strict';

    angular
        .module('app.sales')
        .controller('SalesGridController', SalesGridController);

    SalesGridController.$inject = ['SweetAlert', 'salesFactory'];

    /* @ngInject */
    function SalesGridController(SweetAlert, salesFactory) {
        var vm = this;

        vm.remove = remove;

        activate();

        function activate() {
          salesFactory
            .getAll()
            .then(function(data) {
              vm.sales = data;
            })
        }

        function remove(sale) {
          SweetAlert.swal({
             title: "Are you sure?",
             text: `Whatever will be deleted!`,
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#DD6B55",confirmButtonText: "Are you sure?",
             cancelButtonText: "Cancel",
             closeOnConfirm: false,
             closeOnCancel: false },
          function(isConfirm){
             if (isConfirm) {
               SweetAlert.swal("Deleted!", `${vm.customerName} has been deleted!`, "success");
               salesFactory
                .remove(sale.saleId)
                .then(function() {
                  vm.sales.splice(vm.sales.indexOf(sale), 1);
                });

             } else {
                SweetAlert.swal("Cancelled", `Request to delete ${vm.customerName} cancelled!`, "error");
             }
          });
        }
    }
})();
