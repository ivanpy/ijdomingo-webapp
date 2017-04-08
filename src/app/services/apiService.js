angular.module('app').factory('ApiService', function ApiService($http, __env) {
  
  var service = { 
    obtenerAlumnos: obtenerAlumnos,
    guardarAlumno: guardarAlumno
  };

  return service;

    // Metodo para traer todos los alumnos 
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

    // Metodo para traer todos los alumnos
    function guardarAlumno(body) {
      var uri = __env.apiUrl + 'alumno/agregar';
      return $http({
          url: uri,
          method: "POST",
          data: body,
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }
});