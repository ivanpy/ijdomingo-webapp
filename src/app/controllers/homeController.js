angular.module('app').controller('HomeController', HomeController);
    
function HomeController(ApiService, $log, $uibModal, $timeout, $window){
  
	var self = this;
  
  	self.mostarMensaje = false;
	self.selected = null;
	
	// Metodo que genera la lista de alumnos
	self.listaAlumnos = function () {
		self.alumnos = [];
		ApiService.obtenerAlumnos().then(function(response){
	    	self.alumnos = response.data.alumnos;
	    	//$log.warn("Alumnos: " + JSON.stringify(self.alumnos));
		});
	}

	// Metodo que genera la lista de cursos
	self.listaCursos = function () {
		self.cursos = [];
		ApiService.obtenerCursos().then(function(response){
	    	self.cursos = response.data.curso;
	    	//$log.warn("Cursos: " + JSON.stringify(self.cursos));
		});
	}

	// Metodo que llama al modal de agregar alumnos
	self.mostrarAgregarAlumnoModal = function () {
		var modalInstance = $uibModal.open({
		    controller: 'AlumnoModalController',
		    controllerAs: 'alumnoCtrl',
		    templateUrl: 'app/views/agregarAlumno.html',
		    size: 'lg'
		});

		modalInstance.result.then(function (resultado) {
      		if(resultado.toggl){
      			self.listaAlumnos();
      		}
      		
    	}, function () {
    		// Cuando el modal se cierra
    		self.listaAlumnos();
		});
	}

	// Metodo que llama al modal de agregar alumnos
	self.mostrarAgregarCursoModal = function () {
		var modalInstance = $uibModal.open({
		    controller: 'CursoModalController',
		    controllerAs: 'cursoCtrl',
		    templateUrl: 'app/views/agregarCurso.html',
		    size: 'lg'
		});

		modalInstance.result.then(function (resultado) {
      		if(resultado.toggl){
      			self.listaCursos();
      		}
      		
    	}, function () {
    		// Cuando el modal se cierra
    		self.listaCursos();
		});
	}

	// Meotod que guarda los datos de alumnos
    self.enviar = function () {
    	//$window.alert("Seleccion :"+ self.selected.nombre);
        var alumno = new alumnoJsonBody();
        alumno.dni = self.dni;
        alumno.nombre = self.nombre;
        alumno.apellido = self.apellido;
        alumno.nacionalidad = self.nacionalidad;
        alumno.fecnac = self.fecnac;
        alumno.sexo = self.sexo;
        alumno.fijo = self.fijo;
        alumno.celular = self.celular;
        alumno.email = self.email;
        alumno.provincia = self.provincia;
        alumno.localidad = self.localidad;
        alumno.ocupacion = self.ocupacion;
        ApiService.guardarAlumno(alumno).then(function (response) {
        	self.guardarInscripcion();
        }, function (error) {
            alerta("__error_al_guardar");
        });
    }

    self.guardarInscripcion = function (){
    	var insc = new inscripcionJsonBody();
    	insc.dni = self.dni;
    	insc.alumno = self.nombre + " " + self.apellido;
    	insc.fecinsc = getDatetime();
    	insc.curso = self.selected.nombre;
        ApiService.guardarInscripcion(insc).then(function (response) {
            alerta("__exito_al_guardar");
        }, function (error) {
        	$log.info(error);
            alerta("__error_al_guardar");
        });
    }

	// Contrato para guardar alumnos
    var inscripcionJsonBody = function () {
        return {
        	"dni" : "",
        	"alumno" : "",
            "fecinsc" : "",
            "curso" : "",
            "estadoc": false
        }
    }

    // Contrato para guardar alumnos
    var alumnoJsonBody = function () {
        return {
            "nombre" : "",
            "apellido" : "",
            "nacionalidad" : "",
            "fecnac" : "",
            "dni" : "",
            "sexo" : "",
            "email" : "",
            "fijo" : "",
            "celular" : "",
            "provincia" : "",
            "localidad" : "",
            "ocupacion" : ""
        }
    }

    // Metodo para traer la fecha local del sistema
    var getDatetime = function() {
    	var d = new Date();
  		return d.toString();
	};

	// Metodo que muestra los mensajes de errores
    var alerta = function (validation) {
        self.mostarMensaje = true;
        switch (validation) {
            case "__error_al_guardar":
                self.alertMsg = "Fallo el envio de la inscripcion";
                self.alert = 'alert alert-danger alert-dismissible';
                self.alertType = 'Error';
                break;
            case "__exito_al_guardar":
                self.alertMsg = "Inscripción enviada con exito";
                self.alert = 'alert alert-success alert-dismissible';
                self.alertType = 'Exito';
                break;
        }
        $timeout(function () {  self.mostarMensaje = false; }, 2000);
    }

	self.listaAlumnos();
	self.listaCursos();

	
}