angular.module('app').factory('ApiService', function ApiService($http, __env) {
  
  var service = { 
    obtenerAlumnos: obtenerAlumnos
  };

  return service;

   /* [AD] Metodo para traer todos los alumnos */
    function obtenerAlumnos() {
        var uri = __env.apiUrl + 'alumnos';
        return $http({
            url: uri,
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            return response;
        });
    }
});