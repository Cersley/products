angular.module('app').component('review', {
  templateUrl: 'templates/review.html',
  controller: function ($http, $route, $routeParams, $window, $scope, $timeout) {
    var self = this;
    self.review = '';
    self.revMes = '';
    self.rating = 0;
    var token = $window.sessionStorage.token;
    self.params = $route.current.params.productId;
    $http.get('http://smktesting.herokuapp.com/api/products/')
      .then(function successCallback(response) {
        self.product = response.data[self.params - 1];
      }, function errorCallback(err) {
          console.log('error', err);
      });
    var getReviews = function() {
      $http.get('http://smktesting.herokuapp.com/api/reviews/' + self.params)
          .then(function successCallback(response) {
            self.reviews = response.data;
          }, function errorCallback(err) {
            console.log('error', err);
          });
    };
    getReviews();
    $scope.$watch(function(){
      return $window.sessionStorage.token;
    }, function(){
      token = $window.sessionStorage.token;
    });
    var clearReviewScope = function() {
      self.review = '';
      self.rating = 0;
    };
    self.addReview = function(rating, review) {
      if(token !== undefined) {
        $http.post('http://smktesting.herokuapp.com/api/reviews/' + self.params,
        {rate: self.rating, text: self.review}, {headers: {
          'Authorization': 'Token ' + token
        }})
        .then(function successCallback(response) {
          getReviews();
          clearReviewScope();
        }, function errorCallback(err) {
            console.log('error', err);
        });
      } else {
        self.revMes = 'You should sign in first';
        clearReviewScope();
        $timeout(function () {
          self.revMes = '';
        }, 1000);
      }
    };
  }
});
