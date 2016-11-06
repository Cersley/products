angular.module('app').component('products', {
  // bindings: { products: '=' },
  templateUrl: 'templates/products.html',
  controller: function ff ($http) {
    var self = this;
    $http.get('http://smktesting.herokuapp.com/api/products/')
      .then(function successCallback(response) {
        self.AllProducts = response.data;
      }, function errorCallback(err) {
          console.log('error', err);
      });
  }
});
