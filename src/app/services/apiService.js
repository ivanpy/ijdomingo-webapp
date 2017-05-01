angular.module('app').factory('ApiService', function ApiService($http, __env) {
  
  var service = { 
    obtenerAlumnos: obtenerAlumnos,
    guardarAlumno: guardarAlumno,
    editarAlumno: editarAlumno,
    obtenerCursos: obtenerCursos,
    guardarCurso: guardarCurso,
    editarCurso: editarCurso,
    borrarCurso: borrarCurso,
    guardarInscripcion: guardarInscripcion,
    buscarInscripciones: buscarInscripciones,
    obtenerPronvincias: obtenerPronvincias,
    obtenerRegiones: obtenerRegiones,
    buscarInscripcionPorDniYCurso: buscarInscripcionPorDniYCurso,
    guardarAsistencia: guardarAsistencia,
    buscarAsistenciaPorDniYCurso: buscarAsistenciaPorDniYCurso
  };

  return service;

    //****************************//
    //*Operaciones de Asistencia *//
    //****************************//
    
    // Metodo para guardar curso
    function guardarAsistencia(body) {
      var uri = __env.apiUrl + 'asistencia/agregar';
      return $http({
          url: uri,
          method: "POST",
          data: body,
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }

    // Metodo para buscar asitencia de un alumno
    function buscarAsistenciaPorDniYCurso(dni, curso, fecha) {
      var uri = __env.apiUrl + 'asistencia/buscar/'+dni+'/'+curso+'/'+encodeURIComponent(fecha);
      return $http({
          url: uri,
          method: "GET",
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }
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

     // Metodo para editar alumno
    function editarAlumno(body, id) {
      var uri = __env.apiUrl + 'alumno/editar/' + id;
      return $http({
          url: uri,
          method: "PUT",
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

    // Metodo para editar curso
    function editarCurso(id, body) {
      var uri = __env.apiUrl + 'curso/editar/'+ id;
      return $http({
          url: uri,
          method: "PUT",
          data: body,
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }

    // Metodo para borrar curso
    function borrarCurso(id) {
      var uri = __env.apiUrl + 'curso/borrar/' + id;
      return $http({
          url: uri,
          method: "DELETE",
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

    // Metodo para buscar las inscripciones por dni y curso
    function buscarInscripcionPorDniYCurso(dni, curso) {
      var uri = __env.apiUrl + 'inscripcion/buscar/'+dni+'/'+curso;
      return $http({
          url: uri,
          method: "GET",
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }

     // Metodo para buscar todas las inscripciones
    function buscarInscripciones() {
      var uri = __env.apiUrl + 'inscripciones';
      return $http({
          url: uri,
          method: "GET",
          headers: { "Content-Type": "application/json" }
      }).then(function (response) {
          return response;
      });
    }

    //*****************************//
    //*Datos en formato Json *//
    //*****************************//
    
    // Datos de provincias
    function obtenerPronvincias() {
        var uri = "app/jsons/provincias.json";
        return $http({ 
          url: uri, 
          method: "GET", 
          headers: { "Content-Type": "application/json" }, 
          isArray: true 
        });
    }

    // Datos de regiones
    function obtenerRegiones() {
        var uri = "app/jsons/regiones.json";
        return $http({ 
          url: uri, 
          method: "GET", 
          headers: { "Content-Type": "application/json" }, 
          isArray: true 
        });
    }
});