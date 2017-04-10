angular.module('app').controller('HomeController', HomeController);
    
function HomeController(ApiService, $log, $uibModal){
  
	var self = this;
  
  
	self.titulo = 'Lista de Alumnos';
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

	self.listaAlumnos();
	self.listaCursos();

	
}