angular.module('app').controller('HomeController', HomeController);
    
function HomeController(ApiService, $log, $uibModal){
  
	var self = this;
  
  
	self.titulo = 'Lista de Alumnos';
	
	// Metodo que genera la lista de alumnos
	self.inicio = function () {
		self.alumnos = [];
		ApiService.obtenerAlumnos().then(function(response){
	    	self.alumnos = response.data.alumnos;
	    	//$log.warn("Alumnos: " + JSON.stringify(self.alumnos));
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
      			self.inicio();
      		}
      		
    	}, function () {
    		// Cuando el modal se cierra
    		self.inicio();
		});
	}

	self.inicio();
}