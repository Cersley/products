angular.module('app').component('authorization', {
  templateUrl: 'templates/authorization.html',
  controller: function ($http, $window, $timeout, $route, $scope) {
    var self = this;
    self.showRegistrationForm = false;
    self.registrationForm = function() {
      self.showRegistrationForm = !self.showRegistrationForm;
    };
    self.messageSignIn = '';
    self.messageReg = '';
    self.login = '';
    self.password = '';
    self.loginReg = '';
    self.passwordReg = '';
    self.check = false;
    $scope.$watch(function(){
      return $window.sessionStorage.token;
    }, function(){
      self.checkUser = $window.sessionStorage.token;
    });
    self.signIn = function(login, password) {
      $http.post('http://smktesting.herokuapp.com/api/login/',
      {username: self.login, password: self.password})
      .then(function successCallback(response) {
        if(response.data.success === true) {
          self.messageSignIn = response.data.message;
          $window.sessionStorage.token = response.data.token;
          self.checkUser = response.data.token;
          self.login = '';
          self.password = '';
          $timeout(function () {
            self.messageSignIn = '';
          }, 1000);
        } else {
          self.messageSignIn = response.data.message;
          self.password = '';
          $timeout(function () {
            self.messageSignIn = '';
          }, 1000);
        }
      }, function errorCallback(err) {
        delete $window.sessionStorage.token;
        self.message = 'Error';
      });
    };
    self.signUp = function(loginReg, passwordReg) {
      $http.post('http://smktesting.herokuapp.com/api/register/',
      {username: self.loginReg, password: self.passwordReg})
      .then(function successCallback(response) {
        if(response.data.success === true) {
          self.check = true;
          self.messageReg = 'Registration was succesful';
          $window.sessionStorage.token = response.data.token;
          $timeout(function () {
            self.showRegistrationForm = false;
            self.loginReg = '';
            self.passwordReg = '';
          }, 1500);
        } else {
          self.messageReg = response.data.message;
          self.passwordReg = '';
        }
      }, function errorCallback(err) {
        delete $window.sessionStorage.token;
        self.messageReg = 'Error';
        self.passwordReg = '';
      });
    };
    self.logout = function() {
          delete $window.sessionStorage.token;
    };
  }
});
