angular.module('app').factory('ApiService', function ApiService($http, __env) {
  
  var service = { 
    obtenerAlumnos: obtenerAlumnos,
    guardarAlumno: guardarAlumno,
    obtenerCursos: obtenerCursos,
    guardarCurso: guardarCurso,
    guardarInscripcion: guardarInscripcion
  };

  return service;

    //*************************//
    //*Operaciones de Alumnos *//
    //*************************//

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

    // Metodo para guardar alumno
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

    //***********************//
    //*Operaciones de Curso *//
    //***********************//

    // Metodo para traer todos los cursos 
    function obtenerCursos() {
      var uri = __env.apiUrl + 'cursos';
      return $http({
          url: uri,
          method: "GET",
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }

    // Metodo para guardar curso
    function guardarCurso(body) {
      var uri = __env.apiUrl + 'curso/agregar';
      return $http({
          url: uri,
          method: "POST",
          data: body,
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }

    //*****************************//
    //*Operaciones de Inscripcion *//
    //*****************************//
    // Metodo para guardar curso
    function guardarInscripcion(body) {
      var uri = __env.apiUrl + 'inscripcion/agregar';
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