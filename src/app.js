(function(angular){
/**************************************************************************
   * Set environment values
   *************************************************************************/
  
  // Default environment variables
  var __env = {};
  
  // Import variables if present
  if(window){
    Object.assign(__env, window.__env);
  }
  
  /**************************************************************************
   * Define Angular application
   *************************************************************************/
  
  var ngModule = angular.module('app', ['ui.bootstrap', 'ui.router']);

    /**************************************************************************
   * Make environment available in Angular
   *************************************************************************/
  
  ngModule.constant('__env', __env);
  
  function logEnvironment($log, __env){
    $log.debug('Environment variables:');
    $log.debug(__env)
  }

  ngModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
        url: "/",
        templateUrl: "app/views/home.html",
        controller: "HomeController",
        controllerAs: "homeCtrl"
      })
  });

})(angular)